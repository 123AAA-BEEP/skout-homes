import clientPromise from '@/lib/mongodb';
import type { DbError } from './utils';

export async function setupDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Create indexes for leads collection
    await db.collection('leads').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { phone: 1 }, sparse: true },
      { key: { area: 1 } },
      { key: { type: 1 } },
      { key: { status: 1 } },
      { key: { createdAt: -1 } }
    ]);

    // Create indexes for areas collection
    await db.collection('areas').createIndexes([
      { key: { slug: 1 }, unique: true },
      { key: { 'urlStructure.city': 1 } },
      { key: { 'urlStructure.neighborhood': 1 } },
      { key: { isPublished: 1 } }
    ]);

    console.log('Database setup completed successfully');
    return {
      success: true,
      message: 'Database indexes created successfully'
    };
  } catch (error) {
    console.error('Database setup error:', error);
    const dbError: DbError = new Error('Failed to setup database indexes') as DbError;
    dbError.type = 'operation';
    if (error instanceof Error) {
      dbError.cause = error;
      // Check for duplicate key errors
      if (error.message.includes('duplicate key error')) {
        dbError.code = 'DUPLICATE_KEY';
        dbError.message = 'Duplicate key found while creating indexes';
      }
    }
    throw dbError;
  }
} 