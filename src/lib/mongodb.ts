import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://skouthomes2:2025Email@cluster1skout.utctq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1skout';
const dbName = process.env.MONGODB_DB || 'skout_homes';

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
  writeConcern: {
    w: 'majority'
  },
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  directConnection: false,
  replicaSet: 'atlas-58u7aw-shard-0',
  ssl: true,
  authSource: 'admin',
  serverSelectionTimeoutMS: 30000,
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
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