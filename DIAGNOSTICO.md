# 🔍 DIAGNÓSTICO - Extensión JKanime Hayase

## ✅ STATUS ACTUAL

**Código:** ✓ Funcional (tests 100% pass)  
**Manifest:** ✓ Válido  
**URL Manifest:** `https://raw.githubusercontent.com/Dollxar/jkanime-hayase/main/manifest.json`  
**Problema:** ❌ Hayase no carga la extensión (sin error visible)

---

## 🔧 CHECKLIST - Qué revisar

### 1. ¿Copiaste la URL correcta en Hayase?
- ✓ Debe ser: `https://raw.githubusercontent.com/Dollxar/jkanime-hayase/main/manifest.json`
- ✗ NO: `https://github.com/Dollxar/jkanime-hayase/blob/main/manifest.json` (versionweb, no raw)
- ✗ NO: `https://raw.githubusercontent.com/Dollxar/jkanime-hayase/master/manifest.json` (rama equivocada)

### 2. ¿Limpiaste el caché de Hayase?
```bash
# Windows
rmdir %APPDATA%\Hayase\cache /s /q

# macOS
rm -rf ~/.config/Hayase/cache

# Linux
rm -rf ~/.local/share/Hayase/cache
```

### 3. ¿Reiniciaste Hayase completamente?
- Cierra ALL ventanas de Hayase
- Espera 5 segundos
- Abre de nuevo

### 4. ¿Abre la Consola de Desarrollador en Hayase?
- Presiona `F12` o `Ctrl+Shift+I`
- Busca logs que empiecen con `[JKanime]`
- Si ves:
  - ✓ `[JKanime] Extension loaded in Hayase` → **La extensión cargó OK**
  - ❌ Nada → **Hayase no la está descargando**

---

## 🐛 Posibles Errores Visibles en Consola

### Error: "Invalid extension config"
**Causa:** Manifest JSON inválido  
**Solución:** Verificar con `node -e "console.log(require('./manifest.json'))"`

### Error: "n is not iterable"  
**Causa:** Problema de módulos ES6  
**Solución:** ✓ FIJO (ya cambié a export default puro)

### Error: "fetch is not defined"
**Causa:** Hayase no pasó fetch() correctamente  
**Solución:** El código ya maneja esto

---

## 📋 Verificar que TODO funcione LOCALMENTE

Ejecuta el test incluido:
```bash
node test-hayase-env.js
```

Debe mostrar:
```
=== TODOS LOS TESTS PASARON ✓ ===
```

---

## 💾 Archivos Principales

| Archivo | Propósito |
|---------|-----------|
| `manifest.json` | Configuración de la extensión para Hayase |
| `jkanime.js` | Código principal de la extensión |
| `test-hayase-env.js` | Tests de compatibilidad |

---

## 🔗 URLs de Referencia

- **Manifest:** https://raw.githubusercontent.com/Dollxar/jkanime-hayase/main/manifest.json
- **Código:** https://raw.githubusercontent.com/Dollxar/jkanime-hayase/main/jkanime.js
- **Docs Hayase:** https://wiki.hayase.watch/extensions/development/creating-extensions

---

## ✨ Próximos Pasos

Si todo está OK pero Hayase aún no carga:

1. **Intenta con otra extensión** para descartar problema de Hayase
2. **Checkea el error exacto** en la consola de Hayase (F12)
3. **Abre issue en GitHub** de Hayase con el error
4. **Descarga el archivo .js directamente** y prueba cargarlo localmente

---

## 🚀 Cuando Funcione

La extensión te permitirá:
- Buscar anime en JKanime  
- Obtener torrents/magnet links
- Descargarlos directamente desde Hayase

**Búsqueda típica:**
- Query: `Naruto`
- Resultado: `Naruto - Ep 1 [S1]` con magnet link

---

**Última actualización:** 2024-04-28  
**Versión extensión:** 1.0.0  
**Estado tests:** PASS ✓
