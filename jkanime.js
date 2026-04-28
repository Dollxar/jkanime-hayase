// Cache system
class Cache {
  constructor(ttl = 3600000) { // 1 hour default
    this.store = new Map();
    this.ttl = ttl;
  }

  set(key, value) {
    this.store.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.store.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.store.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear() {
    this.store.clear();
  }
}

// Error handling
class JKanimeError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'JKanimeError';
    this.code = code;
  }
}

export default {
  id: "jkanime",
  name: "JKanime",
  baseUrl: "https://jkanime.net",
  cache: new Cache(),

  /**
   * Search for anime by query
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of anime results
   * @throws {JKanimeError} If search fails
   */
  async search(query) {
    try {
      if (!query || query.trim().length === 0) {
        throw new JKanimeError('Query cannot be empty', 'EMPTY_QUERY');
      }

      const cacheKey = `search:${query}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached) {
        console.log(`[JKanime] Cache hit for query: ${query}`);
        return cached;
      }

      console.log(`[JKanime] Searching for: ${query}`);
      
      // Search via JKanime API/endpoint
      const searchUrl = `${this.baseUrl}/api/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });

      if (!response.ok) {
        throw new JKanimeError(`HTTP ${response.status}: ${response.statusText}`, 'FETCH_ERROR');
      }

      const data = await response.json();
      
      // Parse results
      const results = (data.results || data || []).map(anime => ({
        title: anime.title || anime.name || 'Unknown',
        url: anime.url || `${this.baseUrl}/anime/${anime.id || ''}`,
        image: anime.image || anime.poster || null,
        description: anime.description || null
      })).filter(r => r.url);

      if (results.length === 0) {
        console.warn(`[JKanime] No results found for: ${query}`);
      }

      this.cache.set(cacheKey, results);
      return results;

    } catch (error) {
      console.error('[JKanime] Search error:', error);
      
      if (error instanceof JKanimeError) {
        throw error;
      }
      
      throw new JKanimeError(`Search failed: ${error.message}`, 'SEARCH_ERROR');
    }
  },

  /**
   * Get episodes for an anime URL
   * @param {string} url - Anime URL
   * @returns {Promise<Array>} Array of episodes
   * @throws {JKanimeError} If fetch fails
   */
  async episodes(url) {
    try {
      if (!url) {
        throw new JKanimeError('URL cannot be empty', 'EMPTY_URL');
      }

      const cacheKey = `episodes:${url}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached) {
        console.log(`[JKanime] Cache hit for episodes: ${url}`);
        return cached;
      }

      console.log(`[JKanime] Fetching episodes from: ${url}`);

      const response = await fetch(url, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });

      if (!response.ok) {
        throw new JKanimeError(`HTTP ${response.status}`, 'FETCH_ERROR');
      }

      const html = await response.text();
      
      // Parse episodes from HTML (regex-based extraction)
      const episodeRegex = /ep(?:isodio)?[:\s]+(\d+)|episode[:\s]+(\d+)/gi;
      const episodes = [];
      let match;

      while ((match = episodeRegex.exec(html)) !== null) {
        const number = parseInt(match[1] || match[2]);
        if (!isNaN(number) && !episodes.find(e => e.number === number)) {
          episodes.push({
            number,
            title: `Episodio ${number}`,
            url: `${url}#ep-${number}`
          });
        }
      }

      // If no episodes found, return fallback
      if (episodes.length === 0) {
        console.warn(`[JKanime] No episodes found for: ${url}`);
        return [];
      }

      episodes.sort((a, b) => a.number - b.number);
      this.cache.set(cacheKey, episodes);
      return episodes;

    } catch (error) {
      console.error('[JKanime] Episodes error:', error);
      
      if (error instanceof JKanimeError) {
        throw error;
      }
      
      throw new JKanimeError(`Failed to fetch episodes: ${error.message}`, 'EPISODES_ERROR');
    }
  },

  /**
   * Get streaming URL for an episode
   * @param {string} url - Episode URL
   * @returns {Promise<Object>} Stream object with URL
   * @throws {JKanimeError} If fetch fails
   */
  async stream(url) {
    try {
      if (!url) {
        throw new JKanimeError('URL cannot be empty', 'EMPTY_URL');
      }

      const cacheKey = `stream:${url}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached) {
        console.log(`[JKanime] Cache hit for stream: ${url}`);
        return cached;
      }

      console.log(`[JKanime] Fetching stream from: ${url}`);

      const response = await fetch(url, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
      });

      if (!response.ok) {
        throw new JKanimeError(`HTTP ${response.status}`, 'FETCH_ERROR');
      }

      const html = await response.text();
      
      // Extract iframe or video URL from HTML
      const iframeMatch = html.match(/(?:src="|<iframe[^>]+src=")([^"]+)/i);
      const videoMatch = html.match(/(?:video|src)[:\s]*["']?([^"'\s,}]+\.(?:mp4|m3u8))/i);
      
      const streamUrl = iframeMatch?.[1] || videoMatch?.[1] || url;

      if (!streamUrl) {
        throw new JKanimeError('No stream URL found', 'NO_STREAM');
      }

      const result = {
        url: streamUrl,
        quality: 'default',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': url
        }
      };

      this.cache.set(cacheKey, result);
      return result;

    } catch (error) {
      console.error('[JKanime] Stream error:', error);
      
      if (error instanceof JKanimeError) {
        throw error;
      }
      
      throw new JKanimeError(`Failed to get stream: ${error.message}`, 'STREAM_ERROR');
    }
  },

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    console.log('[JKanime] Cache cleared');
  },

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.store.size,
      items: Array.from(this.cache.store.keys())
    };
  }
};

console.log('[JKanime] Extension loaded successfully');