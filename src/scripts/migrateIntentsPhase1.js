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

const directAgentKeywords = [
  'real-estate-agent',
  'realtor',
  'top-realtor',
  'best-realtor',
  'experienced-realtor',
  'local-realtor',
  'trusted-realtor',
  'recommended-realtor',
  'top-rated-agent',
  'best-real-estate-agent',
  'experienced-agent',
  'local-agent',
  'trusted-agent',
  'recommended-agent'
];

const transactionSpecificKeywords = [
  'selling-agent',
  'listing-agent',
  'sellers-realtor',
  'home-selling-agent',
  'buying-agent',
  'buyers-agent',
  'buyers-realtor',
  'home-buying-agent',
  'first-time-buyer-agent',
  'luxury-home-realtor',
  'investment-property-agent',
  'condo-specialist',
  'house-specialist',
  'townhouse-specialist'
];

const reviewKeywords = [
  'best-reviewed-realtor',
  'top-rated-realtor',
  'realtor-reviews',
  'agent-ratings',
  'real-estate-agent-reviews',
  'realtor-testimonials',
  'agent-testimonials'
];

const serviceKeywords = [
  'free-home-evaluation',
  'free-house-valuation',
  'property-value-estimate',
  'what-is-my-home-worth',
  'sell-my-house',
  'sell-my-home',
  'list-my-house',
  'list-my-property',
  'help-selling-house',
  'help-buying-house',
  'find-realtor-to-sell',
  'find-realtor-to-buy'
];

async function updateAreaIntents(collection, area) {
  const updates = {
    'seo.intents.agentSearch.general': {
      title: `Find Top Real Estate Agents in ${area.name}`,
      description: `Connect with experienced real estate agents in ${area.name}. Get expert guidance for buying, selling, or investing in property.`,
      keywords: directAgentKeywords,
      urlSlug: 'find-agent'
    },
    'seo.intents.agentSearch.transactionType': {
      buyingAgent: {
        title: `Expert Buying Agents in ${area.name}`,
        description: `Find specialized buying agents in ${area.name} to help you find and purchase your ideal property.`,
        keywords: transactionSpecificKeywords.filter(k => k.includes('buy')),
        urlSlug: 'buying-agent'
      },
      sellingAgent: {
        title: `Top Selling Agents in ${area.name}`,
        description: `Connect with experienced selling agents in ${area.name} to get the best value for your property.`,
        keywords: transactionSpecificKeywords.filter(k => k.includes('sell')),
        urlSlug: 'selling-agent'
      }
    },
    'seo.intents.agentSearch.reviews': {
      title: `${area.name} Real Estate Agent Reviews`,
      description: `Read verified reviews and testimonials of real estate agents serving ${area.name}.`,
      keywords: reviewKeywords,
      urlSlug: 'agent-reviews'
    },
    'seo.intents.services': {
      evaluation: {
        title: `Free Home Evaluation in ${area.name}`,
        description: `Get a free, no-obligation home evaluation in ${area.name}. Know your property's worth in today's market.`,
        keywords: serviceKeywords.filter(k => k.includes('evaluation') || k.includes('worth')),
        urlSlug: 'home-evaluation'
      },
      consultation: {
        title: `Real Estate Consultation in ${area.name}`,
        description: `Get expert real estate advice and consultation in ${area.name}. Plan your next property move with confidence.`,
        keywords: serviceKeywords.filter(k => k.includes('help')),
        urlSlug: 'consultation'
      }
    }
  };

  try {
    await collection.updateOne(
      { _id: area._id },
      { $set: updates }
    );
    console.log(`Updated intents for ${area.name}`);
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
    console.log(`Found ${areas.length} areas to update`);

    for (const area of areas) {
      await updateAreaIntents(collection, area);
    }

    console.log('Phase 1 migration completed');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main().catch(console.error); 