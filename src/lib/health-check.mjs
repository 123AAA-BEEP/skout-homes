import clientPromise from '../mongodb.js';
import { getAreas } from './db/areas.js';
import dotenv from 'dotenv';

dotenv.config();

async function healthCheck() {
  try {
    // Check MongoDB connection
    console.log('Checking MongoDB connection...');
    const client = await clientPromise;
    await client.db(process.env.MONGODB_DB).command({ ping: 1 });
    console.log('✅ MongoDB connection successful');

    // Check if we can fetch areas
    console.log('Checking areas collection...');
    const areas = await getAreas({ limit: 1 });
    console.log(`✅ Areas collection accessible (${areas.length} areas found)`);

    // Check environment variables
    console.log('Checking environment variables...');
    const requiredEnvVars = ['MONGODB_URI', 'MONGODB_DB'];
    requiredEnvVars.forEach(envVar => {
      if (!process.env[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
      }
    });
    console.log('✅ Environment variables verified');

    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error);
    throw error;
  }
}

// Run the health check
healthCheck()
  .then(() => {
    console.log('🟢 All systems operational');
    process.exit(0);
  })
  .catch(() => {
    console.log('🔴 System check failed');
    process.exit(1);
  }); 