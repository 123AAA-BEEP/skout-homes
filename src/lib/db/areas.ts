import { MongoClient, ObjectId } from 'mongodb';
import { Area, validateArea, sanitizeArea } from '@/models/Area';
import clientPromise from '@/lib/mongodb';

// Collection name
const COLLECTION = 'areas';

// Get database instance
async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}

// Get all areas (with optional filtering)
export async function getAreas(options: {
  isPublished?: boolean;
  limit?: number;
  skip?: number;
} = {}) {
  const db = await getDb();
  const query = options.isPublished !== undefined ? { isPublished: options.isPublished } : {};
  
  return db
    .collection<Area>(COLLECTION)
    .find(query)
    .skip(options.skip || 0)
    .limit(options.limit || 50)
    .toArray();
}

// Get a single area by slug
export async function getAreaBySlug(slug: string): Promise<Area | null> {
  try {
    console.log('Getting area by slug:', slug);
    const db = await getDb();
    const result = await db.collection<Area>(COLLECTION).findOne({ slug });
    console.log('Found area:', result ? 'yes' : 'no');
    return result;
  } catch (error) {
    console.error('Error in getAreaBySlug:', error);
    throw error;
  }
}

// Create a new area
export async function createArea(areaData: Partial<Area>) {
  try {
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB');

    const dbName = process.env.MONGODB_DB;
    if (!dbName) {
      throw new Error('MONGODB_DB environment variable is not set');
    }
    console.log('Using database:', dbName);

    const db = client.db(dbName);
    const collection = db.collection('areas');

    console.log('Creating area:', JSON.stringify(areaData, null, 2));
    const result = await collection.insertOne(areaData as any);
    console.log('Area created with ID:', result.insertedId);
    
    return result;
  } catch (error) {
    console.error('Error creating area:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

// Update an existing area
export async function updateArea(slug: string, areaData: Partial<Area>) {
  try {
    console.log('Updating area:', slug);
    const db = await getDb();
    const updateData = { ...areaData };
    if ('_id' in updateData) {
      delete updateData._id; // Remove MongoDB ID if present
    }
    const sanitizedData = sanitizeArea(updateData);
    const result = await db.collection<Area>(COLLECTION).updateOne(
      { slug, isPublished: true },
      { $set: sanitizedData }
    );
    console.log('Update result:', result.modifiedCount > 0 ? 'success' : 'no changes');
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error in updateArea:', error);
    throw error;
  }
}

// Delete an area
export async function deleteArea(slug: string) {
  const db = await getDb();
  const result = await db
    .collection<Area>(COLLECTION)
    .deleteOne({ slug });

  return result.deletedCount > 0;
}

// Get popular areas (for static generation)
export async function getPopularAreas(limit = 10) {
  const db = await getDb();
  return db
    .collection<Area>(COLLECTION)
    .find({ isPublished: true })
    .limit(limit)
    .toArray();
}

// Search areas by name or description
export async function searchAreas(query: string, limit = 10) {
  const db = await getDb();
  return db
    .collection<Area>(COLLECTION)
    .find({
      isPublished: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    })
    .limit(limit)
    .toArray();
}

// Get areas by city
export async function getAreasByCity(city: string): Promise<Area[]> {
  try {
    console.log('Getting areas for city:', city);
    const db = await getDb();
    const query = { 
      'urlStructure.city': city.toLowerCase(),
      isPublished: true 
    };
    console.log('Query:', JSON.stringify(query));
    
    const areas = await db
      .collection<Area>(COLLECTION)
      .find(query)
      .toArray();
      
    console.log('Found areas:', areas.length);
    return areas;
  } catch (error) {
    console.error('Error in getAreasByCity:', error);
    throw error;
  }
}

// Get area by city and neighborhood
export async function getAreaByCity(city: string, neighborhood: string): Promise<Area | null> {
  try {
    console.log('Getting area by city and neighborhood:', city, neighborhood);
    const db = await getDb();
    const result = await db.collection<Area>(COLLECTION).findOne({
      'urlStructure.city': city.toLowerCase(),
      'urlStructure.neighborhood': neighborhood.toLowerCase(),
      isPublished: true
    });
    console.log('Found area:', result ? 'yes' : 'no');
    return result;
  } catch (error) {
    console.error('Error in getAreaByCity:', error);
    throw error;
  }
}
 