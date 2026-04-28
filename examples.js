/**
 * Ejemplos de uso de la extensión JKanime para Hayase
 * Este archivo muestra cómo usar todos los métodos disponibles
 */

import jkanime from './jkanime.js';

// ============ EJEMPLOS DE BÚSQUEDA ============

async function exampleSearch() {
  console.log('\n--- Búsqueda de Anime ---\n');
  
  try {
    const results = await jkanime.search('Naruto');
    
    console.log(`Se encontraron ${results.length} resultados:`);
    results.slice(0, 3).forEach(anime => {
      console.log(`
  📺 ${anime.title}
  URL: ${anime.url}
  ${anime.image ? `Poster: ${anime.image}` : ''}
  ${anime.description ? `Desc: ${anime.description.substring(0, 50)}...` : ''}
      `);
    });
  } catch (error) {
    console.error(`❌ Error en búsqueda: ${error.message}`);
    console.error(`Código: ${error.code}`);
  }
}

// ============ EJEMPLOS DE EPISODIOS ============

async function exampleEpisodes() {
  console.log('\n--- Obtener Episodios ---\n');
  
  try {
    // Primero buscar un anime
    const searchResults = await jkanime.search('Attack on Titan');
    
    if (searchResults.length === 0) {
      console.log('No se encontraron resultados');
      return;
    }

    const animeUrl = searchResults[0].url;
    console.log(`Obteniendo episodios de: ${searchResults[0].title}\n`);

    // Obtener episodios
    const episodes = await jkanime.episodes(animeUrl);
    
    console.log(`Se encontraron ${episodes.length} episodios:`);
    episodes.slice(0, 5).forEach(ep => {
      console.log(`  Ep. ${ep.number}: ${ep.title}`);
    });
    
    if (episodes.length > 5) {
      console.log(`  ... y ${episodes.length - 5} episodios más`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

// ============ EJEMPLOS DE STREAMING ============

async function exampleStream() {
  console.log('\n--- Obtener Stream ---\n');
  
  try {
    // Flujo completo: buscar → episodios → stream
    console.log('1️⃣ Buscando anime...');
    const searchResults = await jkanime.search('My Hero Academia');
    
    if (searchResults.length === 0) {
      console.log('No se encontraron resultados');
      return;
    }

    const animeUrl = searchResults[0].url;
    console.log(`✓ Encontrado: ${searchResults[0].title}`);

    console.log('2️⃣ Obteniendo episodios...');
    const episodes = await jkanime.episodes(animeUrl);
    
    if (episodes.length === 0) {
      console.log('No hay episodios disponibles');
      return;
    }

    console.log(`✓ Se encontraron ${episodes.length} episodios`);

    console.log('3️⃣ Obteniendo stream del primer episodio...');
    const stream = await jkanime.stream(episodes[0].url);
    
    console.log(`
    ✓ Stream obtenido:
    • URL: ${stream.url}
    • Calidad: ${stream.quality}
    • Referer: ${stream.headers.Referer}
    `);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

// ============ EJEMPLOS DE CACHÉ ============

async function exampleCache() {
  console.log('\n--- Sistema de Caché ---\n');
  
  try {
    // Primera búsqueda
    console.log('🔍 Primera búsqueda de "Dragon Ball"...');
    const start1 = performance.now();
    const results1 = await jkanime.search('Dragon Ball');
    const time1 = performance.now() - start1;
    console.log(`⏱️ Tiempo: ${time1.toFixed(2)}ms`);
    console.log(`✓ Resultados: ${results1.length}`);

    // Segunda búsqueda (desde caché)
    console.log('\n🔍 Segunda búsqueda de "Dragon Ball" (desde caché)...');
    const start2 = performance.now();
    const results2 = await jkanime.search('Dragon Ball');
    const time2 = performance.now() - start2;
    console.log(`⏱️ Tiempo: ${time2.toFixed(2)}ms`);
    console.log(`✓ Resultados: ${results2.length}`);

    console.log(`\n📊 Mejora de velocidad: ${(time1 / time2).toFixed(1)}x más rápido\n`);

    // Ver estadísticas
    const stats = jkanime.getCacheStats();
    console.log('📈 Estadísticas del caché:');
    console.log(`   • Entradas almacenadas: ${stats.size}`);
    console.log(`   • Claves: ${stats.items.join(', ')}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

// ============ EJEMPLOS DE MANEJO DE ERRORES ============

async function exampleErrorHandling() {
  console.log('\n--- Manejo de Errores ---\n');
  
  // Error 1: Query vacío
  console.log('1️⃣ Intentando búsqueda con query vacío...');
  try {
    await jkanime.search('');
  } catch (error) {
    console.log(`   ❌ ${error.message}`);
    console.log(`   Código: ${error.code}\n`);
  }

  // Error 2: URL vacía en episodios
  console.log('2️⃣ Intentando obtener episodios con URL vacía...');
  try {
    await jkanime.episodes('');
  } catch (error) {
    console.log(`   ❌ ${error.message}`);
    console.log(`   Código: ${error.code}\n`);
  }

  // Error 3: URL inválida
  console.log('3️⃣ Intentando obtener stream con URL inválida...');
  try {
    await jkanime.stream('https://invalid-url.local');
  } catch (error) {
    console.log(`   ❌ ${error.message}`);
    console.log(`   Código: ${error.code}\n`);
  }
}

// ============ EJECUTAR TODOS LOS EJEMPLOS ============

async function runAllExamples() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  Ejemplos de JKanime Hayase Extension  ║');
  console.log('╚════════════════════════════════════════╝');

  // Ejecutar ejemplos (comentar/descomentar según sea necesario)
  
  await exampleErrorHandling(); // Siempre funciona
  await exampleCache();         // Siempre funciona (aunque falle el fetch)
  
  // Estos requieren conexión a internet:
  // await exampleSearch();
  // await exampleEpisodes();
  // await exampleStream();

  console.log('\n✅ Ejemplos completados\n');
}

// Ejecutar si este archivo es el principal
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples().catch(console.error);
}

export { 
  exampleSearch, 
  exampleEpisodes, 
  exampleStream, 
  exampleCache,
  exampleErrorHandling 
};
