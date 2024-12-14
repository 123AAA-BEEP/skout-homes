const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;
    
    console.log('URI:', uri);
    console.log('DB:', dbName);
    
    if (!uri || !dbName) {
      throw new Error('MongoDB configuration is missing');
    }

    // Validate URI format
    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
      throw new Error('Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://');
    }

    console.log('\nTrying to connect...');
    const client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    console.log('Successfully connected to MongoDB');
    
    const db = client.db(dbName);
    console.log('\nTrying to fetch areas...');
    const areas = await db.collection('areas').find({}).limit(1).toArray();
    
    if (areas.length > 0) {
      console.log('\nFirst area document found:', JSON.stringify(areas[0], null, 2));
    } else {
      console.log('\nNo areas found in the database');
    }
    
    await client.close();
  } catch (error) {
    console.error('\nError:', error);
  }
}

testConnection(); 