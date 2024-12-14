import {
  createArea,
  getAreaBySlug,
  updateArea,
  deleteArea,
  getAreas
} from '../areas';
import { Area } from '@/models/Area';
import { MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

describe('MongoDB Area Operations', () => {
  let connection: MongoClient;
  
  // Test data
  const testArea: Partial<Area> = {
    name: 'Test Area',
    slug: 'test-area',
    description: 'Test Description',
    isPublished: true,
    urlStructure: {
      city: 'testcity',
      neighborhood: 'testhood'
    }
  };

  beforeAll(async () => {
    try {
      connection = await clientPromise;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      throw error;
    }
  });

  // Clean up after tests
  afterAll(async () => {
    await deleteArea(testArea.slug!);
  });

  test('Create Area', async () => {
    const result = await createArea(testArea);
    expect(result.insertedId).toBeDefined();
  });

  test('Read Area', async () => {
    const area = await getAreaBySlug(testArea.slug!);
    expect(area).toBeDefined();
    expect(area?.name).toBe(testArea.name);
  });

  test('Update Area', async () => {
    const updateData = {
      description: 'Updated Description'
    };
    const updated = await updateArea(testArea.slug!, updateData);
    expect(updated).toBe(true);

    const area = await getAreaBySlug(testArea.slug!);
    expect(area?.description).toBe(updateData.description);
  });

  test('List Areas', async () => {
    const areas = await getAreas({ isPublished: true });
    expect(Array.isArray(areas)).toBe(true);
  });
}); 