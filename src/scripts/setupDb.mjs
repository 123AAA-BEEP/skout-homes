import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env.local') });

async function setupDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(process.env.MONGODB_DB);

    // Create indexes for areas collection
    console.log('Creating indexes for areas collection...');
    await db.collection('areas').createIndexes([
      { key: { slug: 1 }, unique: true },
      { key: { 'urlStructure.city': 1 } },
      { key: { 'urlStructure.neighborhood': 1 } },
      { key: { isPublished: 1 } }
    ]);

    // Create indexes for leads collection
    console.log('Creating indexes for leads collection...');
    await db.collection('leads').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { phone: 1 }, sparse: true },
      { key: { area: 1 } },
      { key: { type: 1 } },
      { key: { status: 1 } },
      { key: { createdAt: -1 } }
    ]);

    console.log('Database setup completed successfully');
    await client.close();
    return { success: true };
  } catch (error) {
    console.error('Database setup error:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('Setting up database...');
    const result = await setupDatabase();
    console.log('Setup result:', result);
    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

main(); 