// Example of a complete area document structure:
/*
{
  "name": "The Annex",
  "slug": "the-annex",
  "description": "Historic neighborhood known for its Victorian homes and proximity to the University of Toronto",
  "imageUrl": "/images/areas/the-annex.jpg",
  "urlStructure": {
    "city": "toronto",
    "neighborhood": "the-annex"
  },
  "seo": {
    "title": "The Annex Real Estate - Houses & Condos | Toronto",
    "description": "Find homes for sale in The Annex, Toronto. Browse latest listings, market insights, and connect with top real estate agents.",
    "keywords": ["The Annex real estate", "homes for sale The Annex", "The Annex Toronto houses"],
    "intents": {
      "buy": {
        "title": "Buy a Home in The Annex | Toronto Real Estate",
        "description": "Search houses and condos for sale in The Annex. Get expert guidance on buying property in this historic Toronto neighborhood.",
        "h1": "Buy a Home in The Annex",
        "intro": "Looking to buy a home in The Annex? Explore our curated listings of houses and condos for sale in this vibrant Toronto neighborhood."
      },
      "sell": {
        "title": "Sell Your Home in The Annex | Toronto Real Estate",
        "description": "Get a free home valuation and expert selling guidance for your property in The Annex, Toronto.",
        "h1": "Sell Your Home in The Annex",
        "intro": "Ready to sell your home in The Annex? Our local experts will help you get the best price for your property."
      },
      "invest": {
        "title": "Investment Properties in The Annex | Toronto Real Estate",
        "description": "Find investment opportunities in The Annex. Get insights on rental yields and property appreciation in this prime Toronto location.",
        "h1": "Invest in The Annex Real Estate",
        "intro": "Discover lucrative investment opportunities in The Annex, from multi-unit buildings to student housing near U of T."
      },
      "rent": {
        "title": "Rental Properties in The Annex | Toronto Real Estate",
        "description": "Browse apartments and houses for rent in The Annex. Find your perfect rental home in this vibrant Toronto neighborhood.",
        "h1": "Rent in The Annex",
        "intro": "Looking for a rental in The Annex? Explore our selection of apartments and houses available for rent."
      },
      "agents": {
        "title": "Real Estate Agents in The Annex | Toronto Realtors",
        "description": "Connect with experienced real estate agents who specialize in The Annex neighborhood of Toronto.",
        "h1": "The Annex Real Estate Agents",
        "intro": "Work with top-rated real estate agents who know The Annex market inside and out."
      }
    },
    "urlPatterns": {
      "buy": "homes-for-sale",
      "sell": "sell-your-home",
      "invest": "investment-properties",
      "rent": "homes-for-rent",
      "agents": "real-estate-agents"
    }
  },
  "isPublished": true,
  "createdAt": "2024-03-14T00:00:00.000Z",
  "updatedAt": "2024-03-14T00:00:00.000Z"
}
*/

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set up environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env.local') });

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
    
    const results = [];
    
    for (const area of areas) {
      const result = {
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