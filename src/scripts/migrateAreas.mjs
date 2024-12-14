import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set up environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '../../.env.local');
console.log('Loading environment from:', envPath);
dotenv.config({ path: envPath });

// Import locations data
import { locations } from '../data/locations/index.mjs';

const BATCH_SIZE = 20; // Number of areas to process at once

async function migrateAreas() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB);
    const areasCollection = db.collection('areas');

    // Clear existing areas
    await areasCollection.deleteMany({});
    console.log('Cleared existing areas');

    // Process each city
    for (const [city, neighborhoods] of Object.entries(locations)) {
      console.log(`\nProcessing ${city}...`);
      const cityAreas = [];

      // Transform areas data
      for (const [neighborhood, data] of Object.entries(neighborhoods)) {
        const areaData = {
          name: data.name,
          slug: `${city}-${neighborhood}`,
          description: data.description,
          imageUrl: data.imageUrl,
          urlStructure: {
            city: city.toLowerCase(),
            neighborhood: neighborhood.toLowerCase()
          },
          seo: {
            title: `${data.name} Real Estate & Homes for Sale`,
            description: `Find homes for sale in ${data.name}. Get expert guidance from local real estate agents.`,
            keywords: ['real estate', 'homes for sale', data.name, city, neighborhood],
            intents: {
              buy: {
                title: `Buy a Home in ${data.name}`,
                description: `Find your dream home in ${data.name}. Browse listings and connect with expert agents.`,
                keywords: ['buy home', 'buy house', data.name, 'real estate']
              },
              sell: {
                title: `Sell Your Home in ${data.name}`,
                description: `Get top value for your ${data.name} property. Connect with experienced local agents.`,
                keywords: ['sell home', 'sell house', data.name, 'real estate']
              }
            },
            urlPatterns: {
              buy: `/${city}/${neighborhood}/buy`,
              sell: `/${city}/${neighborhood}/sell`,
              invest: `/${city}/${neighborhood}/invest`,
              rent: `/${city}/${neighborhood}/rent`,
              agents: `/${city}/${neighborhood}/agents`
            }
          },
          highlights: data.highlights || [],
          features: data.features || [],
          amenities: data.amenities || [],
          faqs: data.faqs || [],
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        cityAreas.push(areaData);
      }

      // Process areas in batches
      for (let i = 0; i < cityAreas.length; i += BATCH_SIZE) {
        const batch = cityAreas.slice(i, i + BATCH_SIZE);
        await areasCollection.insertMany(batch);
        console.log(`Migrated batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(cityAreas.length / BATCH_SIZE)} for ${city}`);
      }

      console.log(`Completed ${city}: ${cityAreas.length} areas`);
    }

    console.log('\nMigration completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function main() {
  try {
    console.log('Starting area migration...');
    const result = await migrateAreas();
    console.log('Migration result:', result);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main(); 