import clientPromise from '@/lib/mongodb';

export async function verifyConnection() {
  try {
    console.log('Verifying MongoDB connection...');
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'skout_homes';
    
    // Check if we can get the database
    const db = client.db(dbName);
    console.log('Connected to database:', dbName);
    
    // Get collection stats using collStats command
    const stats = await db.command({ collStats: 'areas' });
    console.log("Collection statistics:", {
      documentCount: stats.count,
      totalSize: stats.size,
      avgDocumentSize: stats.avgObjSize
    });

    return {
      success: true,
      message: 'Database connection verified',
      database: dbName
    };
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  verifyConnection()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
} 