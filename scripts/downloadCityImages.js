const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const cities = [
  {
    name: 'toronto',
    url: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f',
  },
  {
    name: 'mississauga',
    url: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc',
  },
  {
    name: 'vaughan',
    url: 'https://images.unsplash.com/photo-1592595896616-c37162298647',
  },
  {
    name: 'oakville',
    url: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5',
  },
  {
    name: 'brampton',
    url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad',
  },
  {
    name: 'milton',
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
  },
  {
    name: 'burlington',
    url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324',
  },
  {
    name: 'markham',
    url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
  },
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(`${url}?w=1920&q=80`, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    });
  });
};

const optimizeImage = async (buffer, filename) => {
  const outputPath = path.join(__dirname, '../public/images/cities', filename);
  
  await sharp(buffer)
    .resize(1920, 1080, { fit: 'cover' })
    .jpeg({ quality: 80, progressive: true })
    .toFile(outputPath);
  
  console.log(`✓ Optimized and saved: ${filename}`);
};

async function main() {
  // Create directory if it doesn't exist
  const dir = path.join(__dirname, '../public/images/cities');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const city of cities) {
    try {
      console.log(`Downloading image for ${city.name}...`);
      const buffer = await downloadImage(city.url);
      await optimizeImage(buffer, `${city.name}.jpg`);
    } catch (error) {
      console.error(`Failed to process ${city.name}:`, error);
    }
  }
}

main().catch(console.error); 