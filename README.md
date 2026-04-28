# JKanime Hayase Extension

Una extensión de torrents para **Hayase** que permite buscar animes de **JKanime** y obtener magnet links para torrentes.

## 📋 Características

- ✅ **Búsqueda de animes** - Busca por título en JKanime
- ✅ **Magnet links** - Genera links de magnet para torrentes
- ✅ **Metadata de torrentes** - Seeders, leechers, tamaño, fecha
- ✅ **Compatible con Hayase** - API completa implementada
- ✅ **Fallback scraper** - Si el API falla, hace scraping de la web

## 🏗️ Estructura del Proyecto

```
jkanime-hayase/
├── manifest.json          # Configuración para Hayase
├── jkanime.js            # Lógica de extensión torrent
├── icon.svg              # Icono de la extensión
├── README.md             # Este archivo
├── .gitignore            # Archivos ignorados
└── .git/                 # Repositorio git
```

## 🚀 Instalación en Hayase

1. Abre **Hayase**
2. Ve a **Settings → Extensions → Repositories**
3. Pega esta URL:
   ```
   https://raw.githubusercontent.com/Dollxar/jkanime-hayase/main/manifest.json
   ```
4. Click en **"Import Extensions"**
5. ¡Listo! La extensión aparecerá en tu lista de extensiones

## 📖 Cómo Funciona

1. **Búsqueda**: Cuando buscas un anime en Hayase, la extensión:
   - Consulta la API de JKanime
   - Extrae información del anime
   - Busca los archivos torrent
   - Genera magnet links

2. **Torrent**: Hayase recibe los magnet links y:
   - Se conecta a la red de torrent
   - Descarga el contenido
   - Lo reproduce en el player

3. **Offline**: Hayase cachea resultados anteriores para modo offline

## 🔧 Métodos Implementados

### `test()`
Verifica que la extensión funciona conectando a JKanime.

```javascript
const works = await extension.test();
// true o throws error
```

### `single(query, options, fetch)`
Busca episodios simples individuales.

```javascript
const results = await extension.single(query, options, fetch);
// Retorna array de TorrentResult
```

### `batch(query, options, fetch)`
Busca releases en lote (temporadas completas).

```javascript
const results = await extension.batch(query, options, fetch);
```

### `movie(query, options, fetch)`
Busca películas de anime.

```javascript
const results = await extension.movie(query, options, fetch);
```

## 📊 Formato de Resultados

Cada resultado retornado tiene esta estructura:

```javascript
{
  title: "Attack on Titan S01E01",
  link: "magnet:?xt=urn:btih:...",  // Magnet link
  hash: "a1b2c3d4...",              // Info hash
  seeders: 150,                     // Seeders activos
  leechers: 45,                     // Leechers activos
  downloads: 1250,                  // Descargas totales
  size: 1500000000,                 // Tamaño en bytes
  date: Date,                       // Fecha de subida
  accuracy: "medium",               // Precisión de búsqueda
  type: "batch"                     // Tipo: batch, best, alt
}
```

## ⚙️ Configuración

La extensión se configura automáticamente, pero puedes ajustar en Hayase:

- **Settings → Extensions → JKanime**
- Aquí aparecerán opciones configurables

## 🐛 Troubleshooting

### "Extension offline"
1. Verifica que jkanime.net esté accesible
2. Si está bloqueado, usa VPN
3. Intenta desde la terminal: `ping jkanime.net`

### "No results found"
1. La extensión puede tardar 10-15s en buscar
2. Usa títulos en inglés o japonés
3. Prueba con animes populares

### "Invalid torrent link"
1. El link puede estar roto
2. La extensión lo detectará y lo marcará con `accuracy: "low"`
3. Hayase buscará en otras extensiones

## 📝 API de Hayase

### TorrentQuery
```typescript
interface TorrentQuery {
  media: any                    // Objeto Media de AniList
  anilistId: number            // ID en AniList
  anidbAid?: number            // ID en AniDB
  titles: string[]             // Títulos alternativos
  episode: number              // Episodio a buscar
  resolution: string           // Resolución: 2160, 1080, 720, etc
  exclusions: string[]         // Keywords a excluir
  type?: 'sub' | 'dub'        // Subtítulos o doblaje
  fetch: typeof fetch          // Función fetch para requests
}
```

### TorrentResult
```typescript
interface TorrentResult {
  title: string                // Título del torrent
  link: string                 // Magnet link o .torrent
  hash: string                 // Info hash
  seeders: number              // Seeders
  leechers: number             // Leechers
  downloads: number            // Descargas totales
  accuracy: 'high'|'medium'|'low'  // Precisión
  size: number                 // Tamaño en bytes
  date: Date                   // Fecha de subida
  type?: 'batch'|'best'|'alt'  // Tipo de release
}
```

## 🤝 Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre cómo contribuir.

## 📝 Licencia

MIT License - Libre para usar y modificar

## 🐛 Reportar Bugs

Abre un issue en [GitHub Issues](https://github.com/Dollxar/jkanime-hayase/issues)

## 📮 Contacto

- **Autor**: Dollxar
- **GitHub**: [@Dollxar](https://github.com/Dollxar)
- **Email**: german.reyes22@cetis107.edu.mx

---

**Versión**: 1.0.0 (Hayase Torrent Extension)  
**Tipo**: Torrent Extension  
**Compatibilidad**: Hayase 0.1.0+  
**Última actualización**: 2026-04-28  
**Estado**: Beta - Funcional

