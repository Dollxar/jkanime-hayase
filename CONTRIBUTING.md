# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a JKanime Hayase Extension!

## 📋 Cómo Contribuir

### Reportar Bugs 🐛

1. Usa el [Issue Tracker](https://github.com/Dollxar/jkanime-hayase/issues)
2. Verifica que el bug no haya sido reportado ya
3. Proporciona:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Versión del navegador/dispositivo
   - Logs o capturas de pantalla

**Ejemplo:**
```
Título: La búsqueda de "Naruto" retorna error 404

Descripción:
Al buscar "Naruto", la extensión muestra error.

Pasos:
1. Abrir Hayase
2. Activar JKanime extension
3. Buscar "Naruto"
4. → Error 404

Esperado: Debería mostrar resultados
```

### Proponer Características ✨

1. Abre un [Issue](https://github.com/Dollxar/jkanime-hayase/issues)
2. Usa el formato: `[FEATURE] Descripción`
3. Explica:
   - Qué problema resuelve
   - Caso de uso
   - Posible implementación

### Enviar Pull Requests 🚀

#### 1. Fork el Repositorio
```bash
git clone https://github.com/TU_USERNAME/jkanime-hayase.git
cd jkanime-hayase
```

#### 2. Crear una rama
```bash
git checkout -b feature/tu-feature
# o para bugs:
git checkout -b fix/nombre-del-bug
```

#### 3. Hacer cambios
- Mantén el código limpio y legible
- Sigue el estilo existente
- Añade comentarios en código complejo
- Actualiza los tests si es necesario

#### 4. Ejecutar Tests
```bash
node jkanime.test.js
```

Asegúrate de que todos los tests pasen ✓

#### 5. Commit de cambios
```bash
git add .
git commit -m "feat: descripción clara del cambio"
```

**Formato de commits:**
- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `refactor:` Reorganización de código
- `test:` Cambios en tests
- `style:` Formato/estilo de código

#### 6. Push y Pull Request
```bash
git push origin feature/tu-feature
```

Luego abre un PR en GitHub con:
- Título descriptivo
- Descripción de cambios
- Referencia a issues relacionados (`Fixes #123`)
- Capturas de pantalla si aplica

## 📝 Estándares de Código

### JavaScript

```javascript
// ✓ Bueno
async function searchAnime(query) {
  if (!query || query.trim().length === 0) {
    throw new JKanimeError('Query vacío', 'EMPTY_QUERY');
  }
  
  try {
    const results = await fetch(...);
    return parseResults(results);
  } catch (error) {
    console.error('[JKanime] Error:', error);
    throw new JKanimeError(error.message, 'SEARCH_ERROR');
  }
}

// ✗ Evitar
async function search(q) {
  let x = fetch(...)
  return x
}
```

### Comentarios

```javascript
/**
 * Busca anime por título
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Resultados de búsqueda
 * @throws {JKanimeError} Si la búsqueda falla
 */
async function search(query) { }
```

### Nombres

- Variables: `camelCase` (searchResults, userData)
- Constantes: `UPPER_SNAKE_CASE` (API_URL, CACHE_TTL)
- Clases: `PascalCase` (JKanimeError, Cache)
- Métodos privados: `_prefijo` (_parseHTML)

## 🧪 Tests

Todos los cambios deben incluir tests:

```javascript
runner.test('Nueva funcionalidad: comportamiento esperado', () => {
  const result = newFunction();
  assertEquals(result, expected, 'Descripción del test');
});
```

## 📚 Documentación

- Actualiza [README.md](README.md) si cambias la API
- Documenta nuevas funciones con JSDoc
- Explica cambios complejos
- Mantén los ejemplos actualizados

## 🎯 Checklist antes de enviar PR

- [ ] Tests pasan: `node jkanime.test.js`
- [ ] Código sigue los estándares
- [ ] Commits tienen mensajes descriptivos
- [ ] Documentación actualizada
- [ ] Sin archivos generados (dist/, node_modules/)
- [ ] Cambios relacionados en una sola rama

## 💬 Comunicación

- Respeta a otros contribuidores
- Mantén conversaciones constructivas
- Haz preguntas si algo no está claro
- Acepta feedback positivamente

## 🎓 Aprende más

- [Guía GitHub: Fork y Pull Request](https://guides.github.com/activities/forking/)
- [Commits convencionales](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

## 🏆 Reconocimiento

Todos los contribuidores serán reconocidos en:
- `README.md` (sección de contribuidores)
- Descripción de releases
- En nuestros agradecimientos públicos

---

¡Esperamos tus contribuciones! 🎉

Si tienes dudas, abre una discusión o contacta a [@Dollxar](https://github.com/Dollxar)
