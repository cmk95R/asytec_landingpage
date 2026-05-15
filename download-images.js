const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

// Todas las imágenes que estás usando en el proyecto
const imageUrls = [
  // Hero
  'https://asytec.com/_next/static/media/carousel1.e3fa0991.png',
  'https://asytec.com/_next/static/media/carrousellhero.1e6771ad.png',
  'https://asytec.com/_next/static/media/carrousellhero3.8f7bcea9.png',
  // About / Metrics
  'https://asytec.com/_next/static/media/1.5128f91e.png',
  'https://asytec.com/_next/static/media/2.58c30918.png',
  'https://asytec.com/_next/static/media/12.ef88365d.png',
  'https://asytec.com/_next/static/media/4.921542f6.png',
  // Services
  'https://asytec.com/_next/static/media/consultoria3.277d5b8f.jpg',
  'https://asytec.com/_next/static/media/desarrollo3.93f477fa.jpg',
  'https://asytec.com/_next/static/media/soporte.86983cf4.jpg',
  'https://asytec.com/_next/static/media/seguridad.cc1842ae.jpg',
  'https://asytec.com/_next/static/media/gestion.04a56933.jpg',
  'https://asytec.com/_next/static/media/RRHH.bdec2acf.jpg'
];

// Crea la carpeta public/images si no existe
const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log('Descargando imágenes en public/images/ ...');

async function downloadImages() {
  for (const url of imageUrls) {
    try {
      const filename = url.split('/').pop();
      const dest = path.join(dir, filename);
      
      const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const fileStream = fs.createWriteStream(dest);
      await finished(Readable.fromWeb(response.body).pipe(fileStream));
      console.log(`✅ Descargada: ${filename}`);
    } catch (err) {
      console.error(`❌ Error con ${url}:`, err.message);
    }
  }
  console.log('¡Proceso terminado!');
}

downloadImages();
