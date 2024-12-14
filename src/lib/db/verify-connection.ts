import clientPromise from '@/lib/mongodb';

async function verifyConnection() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    
    // Get collection stats
    const stats = await db.collection('areas').stats();
    console.log("Collection statistics:", {
      documentCount: stats.count,
      totalSize: stats.size,
      avgDocSize: stats.avgObjSize
    });
    
    // List indexes
    const indexes = await db.collection('areas').indexes();
    console.log("Collection indexes:", indexes);
    
  } catch (error) {
    console.error("Database connection error:", error);
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