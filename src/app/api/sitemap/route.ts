import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Area } from '@/models/Area';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://skouthomes.com';
    const urls: SitemapUrl[] = [];

    // Add static pages
    urls.push(
      { loc: baseUrl, priority: 1.0, changefreq: 'daily' },
      { loc: `${baseUrl}/find-realtor`, priority: 0.9, changefreq: 'weekly' },
      { loc: `${baseUrl}/tools/home-value-estimator`, priority: 0.8, changefreq: 'weekly' },
      { loc: `${baseUrl}/tools/land-transfer-tax-calculator`, priority: 0.8, changefreq: 'weekly' }
    );

    try {
      // Try to get dynamic pages from MongoDB
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      const areas = await db.collection<Area>('areas')
        .find({ isPublished: true })
        .toArray();

      // Add area pages
      for (const area of areas) {
        const baseAreaUrl = `${baseUrl}/${area.urlStructure.city}/${area.urlStructure.neighborhood}`;
        
        urls.push({
          loc: baseAreaUrl,
          lastmod: area.updatedAt?.toISOString() || new Date().toISOString(),
          priority: 0.8,
          changefreq: 'weekly'
        });

        // Add intent-based pages
        ['buying', 'selling', 'investing', 'renting'].forEach(intent => {
          urls.push({
            loc: `${baseAreaUrl}/${intent}`,
            lastmod: area.updatedAt?.toISOString() || new Date().toISOString(),
            priority: 0.7,
            changefreq: 'weekly'
          });
        });
      }
    } catch (error) {
      console.error('Error fetching areas:', error);
      // Continue with static URLs if MongoDB fails
    }

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 