import clientPromise from '@/lib/mongodb';
import { DbError, createDbError } from './utils';

export async function setupDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Create indexes for areas collection
    await db.collection('areas').createIndexes([
      { key: { slug: 1 }, unique: true },
      { key: { 'urlStructure.city': 1, 'urlStructure.neighborhood': 1 }, unique: true },
      { key: { isPublished: 1 } }
    ]);

    // Create indexes for leads collection
    await db.collection('leads').createIndexes([
      { key: { email: 1 } },
      { key: { createdAt: 1 } },
      { key: { status: 1 } }
    ]);

    // Create indexes for pageViews collection
    await db.collection('pageViews').createIndexes([
      { key: { path: 1 } },
      { key: { timestamp: 1 } },
      { key: { city: 1 } }
    ]);

    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Database setup error:', error);
    throw createDbError(
      'SETUP_ERROR',
      'Failed to setup database indexes',
      error instanceof Error ? error.message : String(error)
    );
  }
} 