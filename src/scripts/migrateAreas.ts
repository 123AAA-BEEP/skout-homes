import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { locations } from '../data/locations.mjs';

// Set up environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '../../.env.local');
dotenv.config({ path: envPath });

async function migrateAreas() {
  let client;
  
  try {
    console.log('Starting migration...');
    
    // Verify environment variables
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;
    
    if (!uri) throw new Error('MONGODB_URI is not defined');
    if (!dbName) throw new Error('MONGODB_DB is not defined');
    
    console.log('Connecting to MongoDB...');
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected successfully');
    
    const db = client.db(dbName);
    const collection = db.collection('areas');

    // Clear existing areas
    console.log('Clearing existing areas...');
    await collection.deleteMany({});
    console.log('Existing areas cleared');

    // Migrate each area
    for (const [citySlug, areas] of Object.entries(locations)) {
      console.log(`Processing city: ${citySlug}`);
      for (const [areaSlug, area] of Object.entries(areas)) {
        try {
          console.log(`Migrating ${area.name}...`);
          
          const areaData = {
            ...area,
            slug: `${citySlug}-${areaSlug}`,
            isPublished: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            urlStructure: {
              city: citySlug,
              neighborhood: areaSlug
            }
          };

          await collection.insertOne(areaData);
          console.log(`Successfully migrated ${area.name}`);
        } catch (error) {
          console.error(`Failed to migrate ${area.name}:`, error);
        }
      }
    }

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Run migration
migrateAreas(); 