import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';

// Set up environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env.local') });

const BASE_URL = 'http://localhost:3000';

async function checkServerRunning() {
  try {
    await fetch(BASE_URL);
    return true;
  } catch (error) {
    console.error('Error: Development server is not running. Please start it with npm run dev');
    process.exit(1);
  }
}

async function testUrls() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  // Check if server is running
  await checkServerRunning();

  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB);
    const areas = await db.collection('areas').find({}).toArray();
    
    console.log(`Found ${areas.length} areas to test\n`);
    
    let results = {
      success: 0,
      error: 0,
      details: []
    };

    // Test city-level pages first
    const cities = [...new Set(areas.map(area => area.urlStructure?.city))].filter(Boolean);
    for (const city of cities) {
      const cityUrl = `${BASE_URL}/${city}`;
      try {
        const response = await fetch(cityUrl);
        const status = response.status;
        results.details.push({
          url: cityUrl,
          status,
          type: 'city'
        });
        
        if (status === 200) {
          results.success++;
          console.log(`✓ ${cityUrl}`);
        } else {
          results.error++;
          console.error(`✗ ${cityUrl} (${status})`);
        }
      } catch (error) {
        results.error++;
        console.error(`✗ ${cityUrl} (${error.message})`);
      }
    }

    // Test each area and its intent variations
    for (const area of areas) {
      if (!area.urlStructure?.city || !area.urlStructure?.neighborhood) {
        console.warn(`! Skipping area "${area.name}" - missing URL structure`);
        continue;
      }

      const { city, neighborhood } = area.urlStructure;
      
      // Test base area URL
      const baseUrl = `${BASE_URL}/${city}/${neighborhood}`;
      try {
        const response = await fetch(baseUrl);
        const status = response.status;
        results.details.push({
          url: baseUrl,
          status,
          type: 'area'
        });
        
        if (status === 200) {
          results.success++;
          console.log(`✓ ${baseUrl}`);
        } else {
          results.error++;
          console.error(`✗ ${baseUrl} (${status})`);
        }
      } catch (error) {
        results.error++;
        console.error(`✗ ${baseUrl} (${error.message})`);
      }

      // Test each intent URL
      const intents = ['buy', 'sell', 'invest', 'rent', 'agents'];
      for (const intent of intents) {
        const urlPattern = area.seo?.urlPatterns?.[intent];
        if (!urlPattern) {
          console.warn(`! Missing URL pattern for ${intent} in ${area.name}`);
          continue;
        }

        const intentUrl = `${BASE_URL}/${city}/${neighborhood}/${urlPattern}`;
        try {
          const response = await fetch(intentUrl);
          const status = response.status;
          results.details.push({
            url: intentUrl,
            status,
            type: 'intent',
            intent
          });
          
          if (status === 200) {
            results.success++;
            console.log(`✓ ${intentUrl}`);
          } else {
            results.error++;
            console.error(`✗ ${intentUrl} (${status})`);
          }
        } catch (error) {
          results.error++;
          console.error(`✗ ${intentUrl} (${error.message})`);
        }
      }
    }

    // Print summary
    console.log('\nTesting complete!');
    console.log(`Successful URLs: ${results.success}`);
    console.log(`Failed URLs: ${results.error}`);

    // Group errors by status code
    const errorsByStatus = results.details
      .filter(r => r.status !== 200)
      .reduce((acc, curr) => {
        acc[curr.status] = acc[curr.status] || [];
        acc[curr.status].push(curr.url);
        return acc;
      }, {});

    if (Object.keys(errorsByStatus).length > 0) {
      console.log('\nErrors by status code:');
      for (const [status, urls] of Object.entries(errorsByStatus)) {
        console.log(`\nStatus ${status} (${urls.length} URLs):`);
        urls.forEach(url => console.log(`  ${url}`));
      }
    }

    return results;
  } catch (error) {
    console.error('Error testing URLs:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
testUrls().catch(console.error); 