import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

const cities = [
  'toronto',
  'mississauga',
  'vaughan',
  'oakville',
  'brampton',
  'milton',
  'burlington',
  'markham'
];

const intents = [
  'buy',
  'sell',
  'invest',
  'rent',
  'agents',
  'home-evaluation',
  'consultation'
];

async function getAreas() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(process.env.MONGODB_DB);
    const areas = await db.collection('areas').find({}).toArray();
    console.log(`Found ${areas.length} areas`);
    return areas;
  } catch (error) {
    console.error('MongoDB Error:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function testUrl(url, type) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const fullUrl = `${baseUrl}${url}`;
    console.log(`Testing ${type}: ${fullUrl}`);
    
    const response = await fetch(fullUrl);
    const color = response.ok ? '\x1b[32m' : '\x1b[31m'; // green or red
    console.log(`${color}${type}: ${url} - ${response.status}\x1b[0m`);
    return response.ok;
  } catch (error) {
    console.log(`\x1b[31m${type}: ${url} - ERROR: ${error.message}\x1b[0m`);
    return false;
  }
}

async function main() {
  console.log('Starting URL testing...\n');
  
  const results = {
    total: 0,
    success: 0,
    failed: 0,
    errors: []
  };

  try {
    // Test city pages
    console.log('\nTesting City Pages:');
    for (const city of cities) {
      results.total++;
      const success = await testUrl(`/${city}`, 'City');
      if (success) results.success++; else {
        results.failed++;
        results.errors.push(`City page failed: /${city}`);
      }
    }

    // Test area pages and intents
    console.log('\nTesting Area Pages and Intents:');
    const areas = await getAreas();
    
    for (const area of areas) {
      const baseUrl = `/${area.urlStructure.city}/${area.slug}`;
      
      // Test base area page
      results.total++;
      const areaSuccess = await testUrl(baseUrl, 'Area');
      if (areaSuccess) results.success++; else {
        results.failed++;
        results.errors.push(`Area page failed: ${baseUrl}`);
      }

      // Test intent pages
      for (const intent of intents) {
        const intentUrl = `${baseUrl}/${intent}`;
        results.total++;
        const intentSuccess = await testUrl(intentUrl, 'Intent');
        if (intentSuccess) results.success++; else {
          results.failed++;
          results.errors.push(`Intent page failed: ${intentUrl}`);
        }
      }
    }

    // Print summary
    console.log('\nTest Summary:');
    console.log('=============');
    console.log(`Total URLs tested: ${results.total}`);
    console.log(`Successful: \x1b[32m${results.success}\x1b[0m`);
    console.log(`Failed: \x1b[31m${results.failed}\x1b[0m`);
    console.log(`Success rate: ${((results.success / results.total) * 100).toFixed(1)}%`);
    
    if (results.errors.length > 0) {
      console.log('\nFailed URLs:');
      console.log('============');
      results.errors.forEach(error => console.log(`\x1b[31m${error}\x1b[0m`));
    }
  } catch (error) {
    console.error('\nTest execution failed:', error);
  }
}

main().catch(console.error); 