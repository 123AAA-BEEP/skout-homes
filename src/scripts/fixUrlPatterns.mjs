import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set up environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env.local') });

async function fixUrlPatterns() {
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
      const urlPatterns = {
        buy: 'homes-for-sale',
        sell: 'sell-your-home',
        invest: 'investment-properties',
        rent: 'homes-for-rent',
        agents: 'real-estate-agents'
      };

      // Update the document
      const result = await db.collection('areas').updateOne(
        { _id: area._id },
        {
          $set: {
            'seo.urlPatterns': urlPatterns,
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
fixUrlPatterns().catch(console.error); 