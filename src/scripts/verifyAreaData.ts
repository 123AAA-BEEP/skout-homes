import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set up environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env.local') });

interface VerificationResult {
  areaName: string;
  missingFields: string[];
  missingIntents: string[];
  missingUrlPatterns: string[];
  hasValidStructure: boolean;
}

const verifyAreaData = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB);
    const areas = await db.collection('areas').find({}).toArray();
    
    console.log(`Found ${areas.length} areas to verify\n`);
    
    const results: VerificationResult[] = [];
    
    for (const area of areas) {
      const result: VerificationResult = {
        areaName: area.name || 'Unknown Area',
        missingFields: [],
        missingIntents: [],
        missingUrlPatterns: [],
        hasValidStructure: true
      };
      
      // Check required base fields
      const requiredFields = [
        'name',
        'slug',
        'description',
        'imageUrl',
        'urlStructure',
        'seo',
        'isPublished',
        'createdAt',
        'updatedAt'
      ];
      
      requiredFields.forEach(field => {
        if (!area[field]) {
          result.missingFields.push(field);
          result.hasValidStructure = false;
        }
      });
      
      // Check URL structure
      if (area.urlStructure) {
        if (!area.urlStructure.city) {
          result.missingFields.push('urlStructure.city');
          result.hasValidStructure = false;
        }
        if (!area.urlStructure.neighborhood) {
          result.missingFields.push('urlStructure.neighborhood');
          result.hasValidStructure = false;
        }
      }
      
      // Check SEO structure
      if (area.seo) {
        const requiredSeoFields = ['title', 'description', 'keywords'];
        requiredSeoFields.forEach(field => {
          if (!area.seo[field]) {
            result.missingFields.push(`seo.${field}`);
            result.hasValidStructure = false;
          }
        });
        
        // Check intents
        const requiredIntents = ['buy', 'sell', 'invest', 'rent', 'agents'];
        requiredIntents.forEach(intent => {
          if (!area.seo.intents?.[intent]) {
            result.missingIntents.push(intent);
            result.hasValidStructure = false;
          }
        });
        
        // Check URL patterns
        const requiredUrlPatterns = ['buy', 'sell', 'invest', 'rent', 'agents'];
        requiredUrlPatterns.forEach(pattern => {
          if (!area.seo.urlPatterns?.[pattern]) {
            result.missingUrlPatterns.push(pattern);
            result.hasValidStructure = false;
          }
        });
      }
      
      results.push(result);
    }
    
    // Print results
    console.log('\nVerification Results:');
    console.log('====================\n');
    
    let validCount = 0;
    let invalidCount = 0;
    
    results.forEach(result => {
      console.log(`Area: ${result.areaName}`);
      console.log(`Status: ${result.hasValidStructure ? '✅ Valid' : '❌ Invalid'}`);
      
      if (result.missingFields.length > 0) {
        console.log('Missing Fields:', result.missingFields);
      }
      if (result.missingIntents.length > 0) {
        console.log('Missing Intents:', result.missingIntents);
      }
      if (result.missingUrlPatterns.length > 0) {
        console.log('Missing URL Patterns:', result.missingUrlPatterns);
      }
      console.log('-------------------\n');
      
      result.hasValidStructure ? validCount++ : invalidCount++;
    });
    
    console.log('Summary:');
    console.log(`Total Areas: ${results.length}`);
    console.log(`Valid: ${validCount}`);
    console.log(`Invalid: ${invalidCount}`);
    
    return results;
  } catch (error) {
    console.error('Verification failed:', error);
    throw error;
  } finally {
    await client.close();
  }
};

// Run verification
verifyAreaData().catch(console.error); 