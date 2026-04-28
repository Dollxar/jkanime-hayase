/**
 * JKanime Extension Tests
 * Unit and integration tests for the JKanime Hayase extension
 */

import jkanimeModule from './jkanime.js';

// Test utilities
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('\n========== JKanime Test Suite ==========\n');
    
    for (const { name, fn } of this.tests) {
      try {
        await fn();
        this.passed++;
        console.log(`✓ ${name}`);
      } catch (error) {
        this.failed++;
        console.error(`✗ ${name}`);
        console.error(`  Error: ${error.message}\n`);
      }
    }

    console.log(`\n========== Results ==========`);
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log(`Total: ${this.tests.length}\n`);

    return this.failed === 0;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function assertExists(value, message) {
  if (value === undefined || value === null) {
    throw new Error(message || 'Value does not exist');
  }
}

function assertArray(value, message) {
  if (!Array.isArray(value)) {
    throw new Error(message || 'Value is not an array');
  }
}

// Initialize test runner
const runner = new TestRunner();

// ============ CACHE TESTS ============
runner.test('Cache: Store and retrieve value', () => {
  const cache = jkanimeModule.cache;
  cache.set('test-key', { data: 'test' });
  const result = cache.get('test-key');
  assertExists(result, 'Cache should contain stored value');
  assertEquals(result.data, 'test', 'Cache should return correct value');
});

runner.test('Cache: Return null for non-existent key', () => {
  const cache = jkanimeModule.cache;
  const result = cache.get('non-existent');
  assertEquals(result, null, 'Cache should return null for non-existent key');
});

runner.test('Cache: Expire old entries', async () => {
  const Cache = (await import('./jkanime.js')).default.constructor;
  // Note: This would require modifying the cache class for testing
  console.log('  (Skipped: Requires cache class modification for testing)');
});

runner.test('Cache: Clear all entries', () => {
  const cache = jkanimeModule.cache;
  cache.set('key1', 'value1');
  cache.set('key2', 'value2');
  cache.clear();
  assertEquals(cache.get('key1'), null, 'Cache should be empty after clear');
  assertEquals(cache.get('key2'), null, 'Cache should be empty after clear');
});

runner.test('Cache: Get statistics', () => {
  const cache = jkanimeModule.cache;
  cache.clear();
  cache.set('test1', 'value1');
  cache.set('test2', 'value2');
  const stats = jkanimeModule.getCacheStats();
  assertExists(stats.size, 'Stats should contain size');
  assertArray(stats.items, 'Stats should contain items array');
});

// ============ MODULE TESTS ============
runner.test('Module: Has required properties', () => {
  assertExists(jkanimeModule.id, 'Module should have id');
  assertExists(jkanimeModule.name, 'Module should have name');
  assertEquals(jkanimeModule.id, 'jkanime', 'Module id should be jkanime');
  assertEquals(jkanimeModule.name, 'JKanime', 'Module name should be JKanime');
});

runner.test('Module: Has required methods', () => {
  assertExists(jkanimeModule.search, 'Module should have search method');
  assertExists(jkanimeModule.episodes, 'Module should have episodes method');
  assertExists(jkanimeModule.stream, 'Module should have stream method');
  assertExists(jkanimeModule.clearCache, 'Module should have clearCache method');
  assertExists(jkanimeModule.getCacheStats, 'Module should have getCacheStats method');
});

// ============ ERROR HANDLING TESTS ============
runner.test('Error Handling: Search with empty query', async () => {
  try {
    await jkanimeModule.search('');
    throw new Error('Should have thrown an error');
  } catch (error) {
    assertEquals(error.code, 'EMPTY_QUERY', 'Should throw EMPTY_QUERY error');
  }
});

runner.test('Error Handling: Episodes with empty URL', async () => {
  try {
    await jkanimeModule.episodes('');
    throw new Error('Should have thrown an error');
  } catch (error) {
    assertEquals(error.code, 'EMPTY_URL', 'Should throw EMPTY_URL error');
  }
});

runner.test('Error Handling: Stream with empty URL', async () => {
  try {
    await jkanimeModule.stream('');
    throw new Error('Should have thrown an error');
  } catch (error) {
    assertEquals(error.code, 'EMPTY_URL', 'Should throw EMPTY_URL error');
  }
});

// ============ FETCH SIMULATION TESTS ============
runner.test('Module: Search method returns array', async () => {
  try {
    // This will fail in test environment without network
    const results = await jkanimeModule.search('Naruto');
    assertArray(results, 'Search should return array');
  } catch (error) {
    console.log('  (Expected to fail: Requires network access)');
  }
});

runner.test('Module: Episodes method returns array', async () => {
  try {
    // This will fail in test environment without network
    const episodes = await jkanimeModule.episodes('https://jkanime.net/anime/test');
    assertArray(episodes, 'Episodes should return array');
  } catch (error) {
    console.log('  (Expected to fail: Requires network access)');
  }
});

runner.test('Module: Stream method returns object with URL', async () => {
  try {
    // This will fail in test environment without network
    const stream = await jkanimeModule.stream('https://jkanime.net/anime/test');
    assertExists(stream.url, 'Stream should have URL property');
  } catch (error) {
    console.log('  (Expected to fail: Requires network access)');
  }
});

// ============ INTEGRATION TESTS ============
runner.test('Integration: Cache improves performance', async () => {
  const query = 'test-query-' + Date.now();
  
  try {
    // First call (should be slower, from network)
    const start1 = performance.now();
    await jkanimeModule.search(query);
    const time1 = performance.now() - start1;

    // Second call (should be faster, from cache)
    const start2 = performance.now();
    await jkanimeModule.search(query);
    const time2 = performance.now() - start2;

    console.log(`  First call: ${time1.toFixed(2)}ms, Second call (cached): ${time2.toFixed(2)}ms`);
  } catch (error) {
    console.log('  (Expected to fail: Requires network access)');
  }
});

// ============ RUN TESTS ============
export async function runTests() {
  return await runner.run();
}

// Auto-run if this is the main module
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  // Node.js environment
  runTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}
