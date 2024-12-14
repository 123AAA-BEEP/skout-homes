import clientPromise from '@/lib/mongodb';

async function setupIndexes() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('areas');

    // Create indexes
    await collection.createIndexes([
      { key: { slug: 1 }, unique: true },
      { key: { 'urlStructure.city': 1, 'urlStructure.neighborhood': 1 }, unique: true },
      { key: { name: 'text', description: 'text' } },
      { key: { isPublished: 1 } }
    ]);

    console.log('Indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  setupIndexes()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default setupIndexes; 