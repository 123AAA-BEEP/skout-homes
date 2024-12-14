import { MongoClient } from 'mongodb';
import { Intent } from '../src/models/Intent';
import dotenv from 'dotenv';

dotenv.config();

// Define our intent keywords with their metadata
const intents: Intent[] = [
  // Agent Search Keywords
  {
    keywords: ['real-estate-agent', 'realtor', 'top-realtor', 'best-realtor'],
    displayName: 'Real Estate Agent',
    description: 'Find experienced real estate agents in {area} who can help you buy, sell, or invest in property.',
    seoTitle: 'Top Real Estate Agents in {area} | Find Local Experts',
    seoDescription: 'Connect with experienced real estate agents in {area}. Get expert guidance for buying, selling, or investing in real estate. Free consultation, no obligation.',
    seoKeywords: ['real estate agent', 'realtor', 'top realtor', 'best realtor', '{area} real estate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Transaction Keywords
  {
    keywords: ['houses-for-sale', 'homes-for-sale', 'properties-for-sale'],
    displayName: 'Houses for Sale',
    description: 'Browse the latest houses and properties for sale in {area}. Find your dream home with detailed listings and neighborhood information.',
    seoTitle: 'Houses for Sale in {area} | Current Listings',
    seoDescription: 'Explore houses for sale in {area}. View detailed listings, photos, and neighborhood information to find your perfect home.',
    seoKeywords: ['houses for sale', 'homes for sale', 'properties for sale', '{area} real estate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Language-Specific Keywords
  {
    keywords: ['chinese-speaking-realtor', 'mandarin-speaking-agent', 'cantonese-speaking-agent'],
    displayName: 'Chinese Speaking Realtor',
    description: 'Connect with professional Chinese-speaking real estate agents in {area} who can assist you in Mandarin or Cantonese.',
    seoTitle: 'Chinese Speaking Real Estate Agents in {area}',
    seoDescription: 'Find experienced Chinese speaking realtors in {area}. Get real estate assistance in Mandarin or Cantonese. Free consultation available.',
    seoKeywords: ['chinese speaking realtor', 'mandarin speaking agent', 'cantonese speaking agent', '{area} real estate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Service Keywords
  {
    keywords: ['free-home-evaluation', 'property-value-estimate', 'what-is-my-home-worth'],
    displayName: 'Free Home Evaluation',
    description: 'Get a professional, no-obligation evaluation of your home\'s value in {area}\'s current market.',
    seoTitle: 'Free Home Evaluation in {area} | Get Your Home\'s Value',
    seoDescription: 'Get a free, professional evaluation of your {area} home. Understand your property\'s current market value with expert analysis.',
    seoKeywords: ['free home evaluation', 'property value', 'home worth', '{area} real estate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Market Research Keywords
  {
    keywords: ['market-trends', 'property-prices', 'real-estate-market'],
    displayName: 'Market Trends',
    description: 'Stay informed about the latest real estate market trends and property prices in {area}.',
    seoTitle: '{area} Real Estate Market Trends & Analysis',
    seoDescription: 'Get the latest insights on {area}\'s real estate market trends, property prices, and market analysis from local experts.',
    seoKeywords: ['market trends', 'property prices', 'real estate market', '{area} real estate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function populateIntents() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found in environment variables');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('intents');
    
    // First, let's clear existing intents
    console.log('Clearing existing intents...');
    await collection.deleteMany({});

    // Insert new intents
    console.log('Inserting new intents...');
    const result = await collection.insertMany(intents);
    
    console.log(`Successfully inserted ${result.insertedCount} intents`);
    
    // Create indexes for better performance
    console.log('Creating indexes...');
    await collection.createIndex({ keywords: 1 });
    await collection.createIndex({ isActive: 1 });
    
    console.log('Done!');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

// Run the population script
populateIntents(); 