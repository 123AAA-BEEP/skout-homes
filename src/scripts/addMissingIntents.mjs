import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set up environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env.local') });

async function addMissingIntents() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB);
    const areas = await db.collection('areas').find({}).toArray();
    
    console.log(`Found ${areas.length} areas to update\n`);
    
    let updatedCount = 0;
    
    for (const area of areas) {
      // Create missing intents
      const missingIntents = {
        invest: {
          title: `Investment Properties in ${area.name} | Toronto Real Estate`,
          description: `Find investment opportunities in ${area.name}. Get insights on rental yields and property appreciation in this prime location.`,
          h1: `Invest in ${area.name} Real Estate`,
          intro: `Discover lucrative investment opportunities in ${area.name}, from residential properties to commercial spaces.`
        },
        rent: {
          title: `Rental Properties in ${area.name} | Toronto Real Estate`,
          description: `Browse apartments and houses for rent in ${area.name}. Find your perfect rental home in this vibrant neighborhood.`,
          h1: `Rent in ${area.name}`,
          intro: `Looking for a rental in ${area.name}? Explore our selection of apartments and houses available for rent.`
        },
        agents: {
          title: `Real Estate Agents in ${area.name} | Local Realtors`,
          description: `Connect with experienced real estate agents who specialize in ${area.name} neighborhood.`,
          h1: `${area.name} Real Estate Agents`,
          intro: `Work with top-rated real estate agents who know the ${area.name} market inside and out.`
        }
      };

      // Add URL patterns if missing
      const missingUrlPatterns = {
        invest: 'investment-properties',
        rent: 'homes-for-rent',
        agents: 'real-estate-agents'
      };

      // Update the document
      const result = await db.collection('areas').updateOne(
        { _id: area._id },
        {
          $set: {
            'seo.intents.invest': missingIntents.invest,
            'seo.intents.rent': missingIntents.rent,
            'seo.intents.agents': missingIntents.agents,
            'seo.urlPatterns.invest': missingUrlPatterns.invest,
            'seo.urlPatterns.rent': missingUrlPatterns.rent,
            'seo.urlPatterns.agents': missingUrlPatterns.agents,
            updatedAt: new Date()
          }
        }
      );

      if (result.modifiedCount > 0) {
        updatedCount++;
        console.log(`✓ Updated ${area.name}`);
      }
    }
    
    console.log(`\nUpdated ${updatedCount} areas successfully`);
    return { success: true, updatedCount };
  } catch (error) {
    console.error('Error updating areas:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
addMissingIntents().catch(console.error); 