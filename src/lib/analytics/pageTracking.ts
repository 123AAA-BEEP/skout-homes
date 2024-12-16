import clientPromise from '@/lib/mongodb';

interface PageView {
  path: string;
  timestamp: Date;
  city: string;
  neighborhood?: string;
  propertyType?: string;
  intent?: string;
  userAgent?: string;
  referrer?: string;
  serviceType?: string;
}

interface PagePerformance {
  _id?: string;
  path: string;
  views: number;
  uniqueViews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  lastUpdated: Date;
  city: string;
  neighborhood?: string;
  propertyType?: string;
  intent?: string;
  serviceType?: string;
}

export async function trackPageView(data: Omit<PageView, 'timestamp'>) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Record individual page view
    await db.collection('pageViews').insertOne({
      ...data,
      timestamp: new Date()
    });

    // Update aggregated stats
    const stats = await db.collection('pagePerformance').findOne({ path: data.path });
    
    if (stats) {
      await db.collection('pagePerformance').updateOne(
        { path: data.path },
        {
          $inc: { views: 1 },
          $set: { lastUpdated: new Date() }
        }
      );
    } else {
      await db.collection('pagePerformance').insertOne({
        path: data.path,
        views: 1,
        uniqueViews: 1,
        avgTimeOnPage: 0,
        bounceRate: 0,
        lastUpdated: new Date(),
        city: data.city,
        neighborhood: data.neighborhood,
        propertyType: data.propertyType,
        intent: data.intent,
        serviceType: data.serviceType
      });
    }
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

export async function getTopPerformingPages(options: {
  city?: string;
  intent?: string;
  limit?: number;
  sortBy?: 'views' | 'uniqueViews' | 'avgTimeOnPage' | 'bounceRate';
}): Promise<PagePerformance[]> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const query: Record<string, any> = {};
    if (options.city) query.city = options.city;
    if (options.intent) query.intent = options.intent;

    const results = await db
      .collection('pagePerformance')
      .find(query)
      .sort({ [options.sortBy || 'views']: -1 })
      .limit(options.limit || 10)
      .toArray();
      
    return results as PagePerformance[];
  } catch (error) {
    console.error('Failed to get top performing pages:', error);
    return [];
  }
}

export async function getPagePerformance(path: string): Promise<PagePerformance | null> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection('pagePerformance').findOne({ path });
    return result as PagePerformance | null;
  } catch (error) {
    console.error('Failed to get page performance:', error);
    return null;
  }
}

// Update content priority based on performance
export async function updateContentPriorities() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const topPages = await db
      .collection('pagePerformance')
      .find()
      .sort({ views: -1 })
      .limit(100)
      .toArray();

    for (const page of topPages) {
      await db.collection('areas').updateOne(
        { 'urlStructure.city': page.city, 'urlStructure.neighborhood': page.neighborhood },
        { $set: { contentPriority: Math.ceil(page.views / 100) } }
      );
    }
  } catch (error) {
    console.error('Failed to update content priorities:', error);
  }
} 