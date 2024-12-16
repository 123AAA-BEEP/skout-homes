import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your Mongo URI to environment variables');
}

const options: MongoClientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  },
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  directConnection: false,
  retryWrites: true,
  maxPoolSize: 1,
  minPoolSize: 1,
  maxIdleTimeMS: 10000,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;