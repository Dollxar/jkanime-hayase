// Simular entorno de Hayase Web Worker
import fs from 'fs';

console.log('=== TEST DE ENTORNO HAYASE ===\n');

// 1. Cargar el manifest
console.log('1. Cargando manifest...');
const manifest = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));
console.log('✓ Manifest válido:');
console.log(`  - Type: ${manifest[0].type}`);
console.log(`  - Name: ${manifest[0].name}`);
console.log(`  - Code URL: ${manifest[0].code}`);

// 2. Cargar el código de la extensión
console.log('\n2. Compilando código de extensión...');
const code = fs.readFileSync('./jkanime.js', 'utf8');

// Simular el entorno de Web Worker
let extension = null;
try {
  // Ejecutar el código
  eval(code.replace('export default', 'extension ='));
  
  if (!extension) {
    throw new Error('No export default encontrado');
  }
  
  console.log('✓ Código compilado correctamente');
  console.log(`  - Métodos disponibles: ${Object.getOwnPropertyNames(extension).filter(m => typeof extension[m] === 'function').join(', ')}`);
} catch (e) {
  console.error('✗ Error compilando:', e.message);
  process.exit(1);
}

// 3. Probar métodos
console.log('\n3. Probando métodos...');

async function runTests() {
  try {
    // Mock fetch
    const mockFetch = async (url) => {
      console.log(`  → Fetch: ${url}`);
      return {
        ok: true,
        json: async () => ({
          animes: [
            { id: 1, title: 'Attack on Titan' },
            { id: 2, title: 'Death Note' }
          ]
        })
      };
    };

    // Test method
    console.log('\n  Testing test()...');
    const testResult = await extension.test(mockFetch);
    console.log(`  ✓ test() returned: ${testResult}`);

    // Single method
    console.log('\n  Testing single()...');
    const singleResult = await extension.single(
      { titles: ['Naruto'], episode: 1 },
      {},
      mockFetch
    );
    console.log(`  ✓ single() returned ${singleResult.length} results:`);
    singleResult.forEach(r => {
      console.log(`    - ${r.title}`);
      console.log(`      Link: ${r.link.substring(0, 50)}...`);
      console.log(`      Hash: ${r.hash.substring(0, 20)}...`);
    });

    // Batch method
    console.log('\n  Testing batch()...');
    const batchResult = await extension.batch(
      { titles: ['Naruto'], episode: 1 },
      {},
      mockFetch
    );
    console.log(`  ✓ batch() returned ${batchResult.length} results`);
    if (batchResult[0]) {
      console.log(`    Type: ${batchResult[0].type}`);
      console.log(`    Size: ${(batchResult[0].size / 1e9).toFixed(2)} GB`);
    }

    // Movie method
    console.log('\n  Testing movie()...');
    const movieResult = await extension.movie(
      { titles: ['Naruto Movie'] },
      {},
      mockFetch
    );
    console.log(`  ✓ movie() returned ${movieResult.length} results`);

    console.log('\n=== TODOS LOS TESTS PASARON ✓ ===');
    console.log('\nLa extensión está lista para usarse en Hayase.');
    console.log('URL del manifest: https://raw.githubusercontent.com/Dollxar/jkanime-hayase/main/manifest.json');

  } catch (error) {
    console.error('\n✗ Error durante tests:', error.message);
    process.exit(1);
  }
}

runTests();
