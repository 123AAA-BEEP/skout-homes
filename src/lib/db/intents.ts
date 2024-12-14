import { MongoClient } from 'mongodb';
import { Intent, IntentCategory } from '@/models/Intent';
import clientPromise from '@/lib/mongodb';

// Collection names
const INTENTS_COLLECTION = 'intents';
const INTENT_CATEGORIES_COLLECTION = 'intent_categories';

// Get database instance
async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}

// Get all intent categories
export async function getIntentCategories(): Promise<IntentCategory[]> {
  const db = await getDb();
  return db
    .collection<IntentCategory>(INTENT_CATEGORIES_COLLECTION)
    .find({ isActive: true })
    .toArray();
}

// Get all intents
export async function getAllIntents(): Promise<Intent[]> {
  const db = await getDb();
  return db
    .collection<Intent>(INTENTS_COLLECTION)
    .find({ isActive: true })
    .toArray();
}

// Get intents by category
export async function getIntentsByCategory(category: string): Promise<Intent[]> {
  const db = await getDb();
  return db
    .collection<Intent>(INTENTS_COLLECTION)
    .find({ category, isActive: true })
    .toArray();
}

// Get single intent by keyword
export async function getIntentByKeyword(keyword: string): Promise<Intent | null> {
  if (!keyword) return null;
  
  const db = await getDb();
  try {
    const intent = await db
      .collection<Intent>(INTENTS_COLLECTION)
      .findOne({ keywords: keyword, isActive: true });
    
    return intent;
  } catch (error) {
    console.error('Error fetching intent:', error);
    return null;
  }
}

// Create new intent
export async function createIntent(intentData: Partial<Intent>): Promise<Intent> {
  const db = await getDb();
  const now = new Date();
  
  const intent: Partial<Intent> = {
    ...intentData,
    isActive: true,
    createdAt: now,
    updatedAt: now
  };

  const result = await db
    .collection<Intent>(INTENTS_COLLECTION)
    .insertOne(intent as any);

  return {
    ...intent,
    _id: result.insertedId
  } as Intent;
}

// Update intent
export async function updateIntent(id: string, intentData: Partial<Intent>): Promise<boolean> {
  const db = await getDb();
  const result = await db
    .collection<Intent>(INTENTS_COLLECTION)
    .updateOne(
      { _id: new MongoClient.ObjectId(id) },
      { 
        $set: { 
          ...intentData,
          updatedAt: new Date()
        } 
      }
    );

  return result.modifiedCount > 0;
}

// Delete intent
export async function deleteIntent(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db
    .collection<Intent>(INTENTS_COLLECTION)
    .deleteOne({ _id: new MongoClient.ObjectId(id) });

  return result.deletedCount > 0;
} 