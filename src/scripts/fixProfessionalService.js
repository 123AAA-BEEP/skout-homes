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

const professionalServiceKeywords = [
  'real-estate-lawyer',
  'mortgage-broker',
  'home-inspector',
  'property-manager',
  'real-estate-photographer',
  'home-stager',
  'property-evaluator'
];

async function fixProfessionalService(collection, area) {
  const updates = {
    'seo.intents.services.professional': {
      title: `Professional Real Estate Services in ${area.name}`,
      description: `Connect with trusted real estate professionals in ${area.name}. Find lawyers, mortgage brokers, home inspectors, and more.`,
      keywords: professionalServiceKeywords,
      urlSlug: 'professional-services'
    }
  };

  try {
    await collection.updateOne(
      { _id: area._id },
      { $set: updates }
    );
    console.log(`Fixed professional service intent for ${area.name}`);
  } catch (err) {
    console.error(`Error updating ${area.name}:`, err);
  }
}

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('areas');

    const areas = await collection.find({}).toArray();
    console.log(`Found ${areas.length} areas to fix`);

    for (const area of areas) {
      await fixProfessionalService(collection, area);
    }

    console.log('Professional service intent fixes completed');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main().catch(console.error); 