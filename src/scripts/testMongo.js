import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set up environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env.local') });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('areas');

    // Check intent structure for a sample area
    console.log('\nChecking intent structure:');
    const annex = await collection.findOne({ slug: 'toronto-annex' });
    if (annex) {
      console.log('\nArea:', annex.name);
      
      // Check Agent Search Intents
      console.log('\nAgent Search Intents:');
      const agentSearch = annex.seo?.intents?.agentSearch;
      if (agentSearch) {
        console.log('General:', agentSearch.general?.title);
        console.log('Transaction Types:');
        Object.entries(agentSearch.transactionType || {}).forEach(([key, value]) => {
          console.log(`- ${key}:`, value.title);
        });
        
        console.log('\nSpecialties:');
        Object.entries(agentSearch.specialties || {}).forEach(([key, value]) => {
          console.log(`- ${key}:`, value.type);
        });

        console.log('\nLanguages:');
        Object.entries(agentSearch.languages || {}).forEach(([key, value]) => {
          console.log(`- ${key}:`, value.type);
        });
      } else {
        console.log('No agent search intents found');
      }

      // Check Service Intents
      console.log('\nService Intents:');
      const services = annex.seo?.intents?.services;
      if (services) {
        Object.entries(services).forEach(([key, value]) => {
          console.log(`- ${key}:`, value.title);
        });
      } else {
        console.log('No service intents found');
      }

      // Check Life Situation Intents
      console.log('\nLife Situation Intents:');
      const situations = annex.seo?.intents?.situations;
      if (situations) {
        Object.entries(situations).forEach(([key, value]) => {
          console.log(`- ${key}:`, value.title);
        });
      } else {
        console.log('No situation intents found');
      }

      // Check URL Patterns
      console.log('\nURL Patterns:');
      const urlPatterns = annex.seo?.urlPatterns;
      if (urlPatterns) {
        Object.entries(urlPatterns).forEach(([key, value]) => {
          console.log(`- ${key}:`, value);
        });
      } else {
        console.log('No URL patterns found');
      }
    } else {
      console.log('No area found with slug: toronto-annex');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main().catch(console.error); 