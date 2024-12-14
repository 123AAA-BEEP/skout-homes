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

const marketResearchKeywords = {
  analysis: [
    'market-trends',
    'property-prices',
    'home-values',
    'price-history',
    'market-statistics',
    'housing-market',
    'real-estate-forecast',
    'market-report',
    'price-per-sqft',
    'average-price',
    'median-price'
  ],
  investment: [
    'investment-properties',
    'income-properties',
    'rental-income',
    'cap-rate',
    'roi-analysis',
    'property-investment',
    'real-estate-investment',
    'investment-opportunities',
    'cash-flow-properties',
    'multi-unit-properties',
    'commercial-properties'
  ]
};

const propertyTypeKeywords = {
  residential: [
    'detached-house',
    'semi-detached',
    'townhouse',
    'condo-apartment',
    'luxury-homes',
    'starter-homes',
    'family-homes',
    'bungalow',
    'split-level',
    'custom-built'
  ],
  features: [
    'waterfront-properties',
    'luxury-properties',
    'pool-homes',
    'garage-parking',
    'basement-apartment',
    'ravine-lot',
    'corner-lot',
    'premium-lot'
  ]
};

async function updateAreaMarketData(collection, area) {
  const updates = {
    'seo.intents.marketResearch': {
      analysis: {
        title: `${area.name} Real Estate Market Analysis`,
        description: `Get detailed market analysis, trends, and statistics for ${area.name} real estate market.`,
        keywords: marketResearchKeywords.analysis,
        urlSlug: 'market-analysis'
      },
      investment: {
        title: `Investment Properties in ${area.name}`,
        description: `Find investment opportunities and analyze ROI potential in ${area.name} real estate market.`,
        keywords: marketResearchKeywords.investment,
        urlSlug: 'investment-analysis'
      }
    },
    'seo.intents.properties': {
      residential: {
        title: `${area.name} Residential Properties`,
        description: `Explore different types of residential properties available in ${area.name}.`,
        keywords: propertyTypeKeywords.residential,
        urlSlug: 'residential'
      },
      features: {
        title: `Featured Properties in ${area.name}`,
        description: `Discover properties with special features and premium locations in ${area.name}.`,
        keywords: propertyTypeKeywords.features,
        urlSlug: 'featured'
      }
    },
    'seo.intents.services': {
      professional: {
        title: `Real Estate Services in ${area.name}`,
        description: `Connect with professional real estate service providers in ${area.name}.`,
        keywords: professionalServiceKeywords,
        urlSlug: 'services'
      }
    }
  };

  try {
    await collection.updateOne(
      { _id: area._id },
      { $set: updates }
    );
    console.log(`Updated market data for ${area.name}`);
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
      await updateAreaMarketData(collection, area);
    }

    console.log('Phase 3 migration completed');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main().catch(console.error); 