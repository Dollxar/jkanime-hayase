# JKanime Hayase Extension

Una extensión para **Hayase** (app de anime) que integra **JKanime** como proveedor de contenido de anime en streaming.

## 📋 Características

- ✅ **Búsqueda de anime** - Busca por título en JKanime
- ✅ **Listado de episodios** - Obtiene todos los episodios disponibles
- ✅ **Streaming** - Obtiene el enlace de reproducción del episodio
- ✅ **Caché inteligente** - Almacena resultados por 1 hora para mejorar rendimiento
- ✅ **Manejo robusto de errores** - Validación y excepciones personalizadas
- ✅ **Tests unitarios** - Suite completa de pruebas

## 🏗️ Estructura del Proyecto

```
jkanime-hayase/
├── manifest.json          # Configuración del plugin
├── jkanime.js            # Lógica principal
├── jkanime.test.js       # Suite de tests
├── README.md             # Este archivo
├── .gitignore            # Archivos ignorados por git
└── CONTRIBUTING.md       # Guía de contribución
```

## 🚀 Instalación

### En Hayase:
1. Ve a **Extensiones** en Hayase
2. Pega esta URL: `https://raw.githubusercontent.com/Dollxar/jkanime-hayase/main/manifest.json`
3. ¡Listo! Podrás buscar anime en JKanime desde Hayase

### Desarrollo local:
```bash
git clone https://github.com/Dollxar/jkanime-hayase.git
cd jkanime-hayase
```

## 📖 Uso

### En tu aplicación:

```javascript
import jkanime from './jkanime.js';

// Buscar anime
const results = await jkanime.search('Naruto');
// → [{ title: 'Naruto', url: '...', image: '...', ... }]

// Obtener episodios
const episodes = await jkanime.episodes('https://jkanime.net/anime/naruto');
// → [{ number: 1, title: 'Episodio 1', url: '...' }, ...]

// Obtener stream
const stream = await jkanime.stream('https://jkanime.net/anime/naruto#ep-1');
// → { url: 'https://...', quality: 'default', headers: {...} }

// Limpiar caché
jkanime.clearCache();

// Ver estadísticas del caché
console.log(jkanime.getCacheStats());
```

## 🔧 API

### `search(query: string): Promise<Array>`
Busca anime por nombre.

**Parámetros:**
- `query` (string): Término de búsqueda

**Retorna:** Array de objetos con estructura:
```javascript
{
  title: string,           // Nombre del anime
  url: string,            // URL en JKanime
  image: string|null,     // URL de poster
  description: string|null // Descripción
}
```

**Errores:**
- `EMPTY_QUERY` - Query vacío
- `FETCH_ERROR` - Error al obtener datos
- `SEARCH_ERROR` - Error general de búsqueda

---

### `episodes(url: string): Promise<Array>`
Obtiene los episodios disponibles de un anime.

**Parámetros:**
- `url` (string): URL del anime en JKanime

**Retorna:** Array de objetos:
```javascript
{
  number: number,    // Número de episodio
  title: string,     // Título del episodio
  url: string        // URL del episodio
}
```

**Errores:**
- `EMPTY_URL` - URL vacía
- `FETCH_ERROR` - Error HTTP
- `EPISODES_ERROR` - Error al parsear episodios

---

### `stream(url: string): Promise<Object>`
Obtiene el enlace de streaming de un episodio.

**Parámetros:**
- `url` (string): URL del episodio

**Retorna:**
```javascript
{
  url: string,      // URL del stream
  quality: string,  // Calidad (default, 720p, etc)
  headers: object   // Headers necesarios para reproducción
}
```

**Errores:**
- `EMPTY_URL` - URL vacía
- `FETCH_ERROR` - Error HTTP
- `NO_STREAM` - No se encontró URL de stream
- `STREAM_ERROR` - Error general

---

### `clearCache(): void`
Limpia todo el caché almacenado.

---

### `getCacheStats(): Object`
Retorna estadísticas del caché.

**Retorna:**
```javascript
{
  size: number,      // Cantidad de entradas
  items: string[]    // Lista de claves cacheadas
}
```

## 🧪 Tests

Ejecutar los tests:

```bash
node jkanime.test.js
```

### Cobertura de tests:

- ✅ Funcionalidad de caché (set, get, clear, stats)
- ✅ Módulo (propiedades requeridas)
- ✅ Manejo de errores (validaciones)
- ✅ Métodos principales (search, episodes, stream)
- ✅ Tests de integración

## 📊 Caché

El sistema de caché automáticamente:
- Almacena resultados durante **1 hora**
- Se valida automáticamente en cada acceso
- Puede limpiarse manualmente con `clearCache()`
- Mejora significativamente el rendimiento

**Ejemplo:**
```javascript
// Primera llamada (desde red, ~500ms)
await jkanime.search('Naruto');

// Segunda llamada (desde caché, ~1ms)
await jkanime.search('Naruto');
```

## ⚠️ Manejo de Errores

Todos los métodos lanzan `JKanimeError` con propiedades:
- `message` - Descripción del error
- `code` - Código único del error

```javascript
try {
  await jkanime.search('');
} catch (error) {
  if (error.code === 'EMPTY_QUERY') {
    console.log('El query no puede estar vacío');
  }
}
```

## 🤝 Contribución

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

**Versión**: 1.0.0  
**Última actualización**: 2026-04-28  
**Estado**: Beta - Funcional pero en desarrollo continuo
