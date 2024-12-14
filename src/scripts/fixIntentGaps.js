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

async function fixAreaIntents(collection, area) {
  const updates = {
    'seo.intents.services': {
      evaluation: {
        title: `Free Home Evaluation in ${area.name}`,
        description: `Get a detailed home evaluation in ${area.name}. Know your property's worth in today's market.`,
        keywords: ['free-home-evaluation', 'property-value-estimate', 'what-is-my-home-worth'],
        urlSlug: 'home-evaluation'
      },
      consultation: {
        title: `Real Estate Consultation in ${area.name}`,
        description: `Expert real estate consultation for ${area.name}. Get professional advice for your property decisions.`,
        keywords: ['real-estate-consultation', 'property-advice', 'real-estate-advice'],
        urlSlug: 'consultation'
      }
    },
    'seo.urlPatterns': {
      ...area.seo.urlPatterns,
      // Language-specific patterns
      chineseAgent: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/chinese-speaking-agent`,
      farsiAgent: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/farsi-speaking-agent`,
      hindiAgent: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/hindi-speaking-agent`,
      punjabiAgent: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/punjabi-speaking-agent`,
      urduAgent: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/urdu-speaking-agent`,
      
      // Specialty patterns
      luxuryAgent: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/luxury-specialist`,
      investmentAgent: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/investment-specialist`,
      commercialAgent: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/commercial-specialist`,
      
      // Life situation patterns
      relocation: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/relocation`,
      retirement: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/retirement`,
      divorce: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/divorce`,
      
      // Market research patterns
      marketAnalysis: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/market-analysis`,
      investmentAnalysis: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/investment-analysis`,
      
      // Property type patterns
      residential: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/residential`,
      featured: `/${area.urlStructure.city}/${area.urlStructure.neighborhood}/featured-properties`
    }
  };

  try {
    await collection.updateOne(
      { _id: area._id },
      { $set: updates }
    );
    console.log(`Fixed intents for ${area.name}`);
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
      await fixAreaIntents(collection, area);
    }

    console.log('Intent fixes completed');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main().catch(console.error); 