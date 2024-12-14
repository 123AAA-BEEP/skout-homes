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

async function verifyAreaIntents(area) {
  console.log(`\nVerifying ${area.name}:`);
  
  // Check Base SEO
  console.log('\n1. Base SEO Structure:');
  if (area.seo?.title && area.seo?.description && area.seo?.keywords) {
    console.log('✓ Base SEO structure complete');
  } else {
    console.log('✗ Missing base SEO elements');
  }

  // Check Agent Search Intents
  console.log('\n2. Agent Search Intents:');
  const agentSearch = area.seo?.intents?.agentSearch;
  if (agentSearch) {
    console.log('General:', agentSearch.general?.title ? '✓' : '✗');
    console.log('Transaction Types:', Object.keys(agentSearch.transactionType || {}).length, 'types');
    console.log('Specialties:', Object.keys(agentSearch.specialties || {}).length, 'specialties');
    console.log('Languages:', Object.keys(agentSearch.languages || {}).length, 'languages');
    console.log('Experience Levels:', Object.keys(agentSearch.experience || {}).length, 'levels');
  } else {
    console.log('✗ Missing agent search intents');
  }

  // Check Service Intents
  console.log('\n3. Service Intents:');
  const services = area.seo?.intents?.services;
  if (services) {
    console.log('Evaluation:', services.evaluation?.title ? '✓' : '✗');
    console.log('Consultation:', services.consultation?.title ? '✓' : '✗');
    console.log('Professional:', services.professional?.title ? '✓' : '✗');
  } else {
    console.log('✗ Missing service intents');
  }

  // Check Life Situation Intents
  console.log('\n4. Life Situation Intents:');
  const situations = area.seo?.intents?.situations;
  if (situations) {
    console.log('Total situations:', Object.keys(situations).length);
    Object.entries(situations).forEach(([key, value]) => {
      console.log(`- ${key}:`, value.title ? '✓' : '✗');
    });
  } else {
    console.log('✗ Missing life situation intents');
  }

  // Check Market Research
  console.log('\n5. Market Research:');
  const marketResearch = area.seo?.intents?.marketResearch;
  if (marketResearch) {
    console.log('Analysis:', marketResearch.analysis?.title ? '✓' : '✗');
    console.log('Investment:', marketResearch.investment?.title ? '✓' : '✗');
  } else {
    console.log('✗ Missing market research intents');
  }

  // Check Property Types
  console.log('\n6. Property Types:');
  const properties = area.seo?.intents?.properties;
  if (properties) {
    console.log('Residential:', properties.residential?.title ? '✓' : '✗');
    console.log('Features:', properties.features?.title ? '✓' : '✗');
  } else {
    console.log('✗ Missing property types');
  }

  // Check URL Patterns
  console.log('\n7. URL Patterns:');
  const urlPatterns = area.seo?.urlPatterns;
  if (urlPatterns) {
    console.log('Total patterns:', Object.keys(urlPatterns).length);
    Object.entries(urlPatterns).forEach(([key, value]) => {
      console.log(`- ${key}: ${value}`);
    });
  } else {
    console.log('✗ Missing URL patterns');
  }
}

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('areas');

    // Test with a few sample areas
    const sampleAreas = await collection.find().limit(3).toArray();
    
    for (const area of sampleAreas) {
      await verifyAreaIntents(area);
    }

    console.log('\nVerification complete');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main().catch(console.error); 