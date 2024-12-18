import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import clientPromise from '@/lib/mongodb';
import { Area } from '@/models/Area';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Protect the route with a secret token
const CRON_SECRET = process.env.CRON_SECRET;

const validCities = [
  'toronto',
  'mississauga',
  'vaughan',
  'oakville',
  'brampton',
  'milton',
  'burlington',
  'markham'
] as const;

const validIntents = [
  'homes-for-sale',
  'sell-your-home',
  'investment-properties',
  'homes-for-rent',
  'real-estate-agents'
] as const;

export async function GET(request: Request) {
  try {
    // Verify the secret token
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!CRON_SECRET || token !== CRON_SECRET) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('Starting sitemap generation...');
    const baseUrl = process.env.NEXTAUTH_URL || 'https://skouthomes.com';
    const urls: SitemapUrl[] = [];

    // Add static pages
    urls.push(
      { loc: baseUrl, priority: 1.0, changefreq: 'daily' },
      { loc: `${baseUrl}/find-realtor`, priority: 0.9, changefreq: 'daily' },
      { loc: `${baseUrl}/tools/home-value-estimator`, priority: 0.8, changefreq: 'weekly' },
      { loc: `${baseUrl}/tools/land-transfer-tax-calculator`, priority: 0.8, changefreq: 'weekly' }
    );

    // Add city pages
    validCities.forEach(city => {
      urls.push({
        loc: `${baseUrl}/${city}`,
        priority: 0.9,
        changefreq: 'daily'
      });
    });

    // Get dynamic pages from MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const areas = await db.collection<Area>('areas')
      .find({ isPublished: true })
      .toArray();

    // Add area pages with all possible combinations
    for (const area of areas) {
      if (!area.urlStructure?.city || !area.urlStructure?.neighborhood) {
        console.warn(`Skipping area ${area._id} due to missing URL structure`);
        continue;
      }

      const baseAreaUrl = `${baseUrl}/${area.urlStructure.city}/${area.urlStructure.neighborhood}`;
      
      // Main area page
      urls.push({
        loc: baseAreaUrl,
        lastmod: area.updatedAt?.toISOString() || new Date().toISOString(),
        priority: 0.8,
        changefreq: 'daily'
      });

      // Add intent pages
      validIntents.forEach(intent => {
        urls.push({
          loc: `${baseAreaUrl}/${intent}`,
          lastmod: area.updatedAt?.toISOString() || new Date().toISOString(),
          priority: 0.7,
          changefreq: 'daily'
        });
      });

      // Add property type variations
      if (area.propertyTypes?.length > 0) {
        area.propertyTypes.forEach(propertyType => {
          urls.push({
            loc: `${baseAreaUrl}/homes-for-sale/${propertyType.toLowerCase().replace(/\s+/g, '-')}`,
            lastmod: area.updatedAt?.toISOString() || new Date().toISOString(),
            priority: 0.6,
            changefreq: 'weekly'
          });
        });
      }
    }

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

    // Write sitemap to public directory
    const publicPath = join(process.cwd(), 'public', 'sitemap.xml');
    await writeFile(publicPath, sitemap);

    return new NextResponse(JSON.stringify({
      success: true,
      message: `Sitemap generated with ${urls.length} URLs`,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Sitemap Generation Error:', error);
    return new NextResponse(JSON.stringify({
      success: false,
      error: error.message || 'Unknown error occurred'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 