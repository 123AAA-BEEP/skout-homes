import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://skouthomes2:2025Email@cluster1skout.utctq.mongodb.net/skout_homes?retryWrites=true&w=majority&ssl=true';
const dbName = process.env.MONGODB_DB || 'skout_homes';

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const options: MongoClientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  },
  directConnection: process.env.MONGODB_DIRECT_CONNECTION === 'true',
  ssl: true,
  tls: true,
  tlsInsecure: false
};

// Global MongoDB client promise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .catch(error => {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    });
}

export default clientPromise; 