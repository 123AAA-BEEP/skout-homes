import * as fs from 'fs-extra';
import * as path from 'path';
import clientPromise from '@/lib/mongodb';
import { Area } from '@/models/Area';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

async function generateSitemap() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Get all areas
    const areas = await db.collection<Area>('areas')
      .find({ isPublished: true })
      .toArray();

    const baseUrl = 'https://yourdomain.com'; // Replace with your domain
    const urls: SitemapUrl[] = [];

    // Add static pages
    urls.push(
      { loc: `${baseUrl}`, priority: 1.0, changefreq: 'daily' },
      { loc: `${baseUrl}/find-realtor`, priority: 0.9, changefreq: 'weekly' },
      { loc: `${baseUrl}/tools/home-value-estimator`, priority: 0.8, changefreq: 'weekly' },
      { loc: `${baseUrl}/tools/land-transfer-tax-calculator`, priority: 0.8, changefreq: 'weekly' }
    );

    // Add area pages
    for (const area of areas) {
      const baseAreaUrl = `${baseUrl}/${area.urlStructure.city}/${area.urlStructure.neighborhood}`;
      
      // Basic area page
      urls.push({
        loc: baseAreaUrl,
        lastmod: area.updatedAt.toISOString(),
        priority: 0.8,
        changefreq: 'weekly'
      });

      // Intent-based pages
      ['buying', 'selling', 'investing', 'renting'].forEach(intent => {
        urls.push({
          loc: `${baseAreaUrl}/${intent}`,
          lastmod: area.updatedAt.toISOString(),
          priority: 0.7,
          changefreq: 'weekly'
        });
      });

      // Property type pages
      ['house', 'condo', 'townhouse'].forEach(propertyType => {
        ['buying', 'selling', 'investing', 'renting'].forEach(intent => {
          urls.push({
            loc: `${baseAreaUrl}/${propertyType}/${intent}`,
            lastmod: area.updatedAt.toISOString(),
            priority: 0.6,
            changefreq: 'weekly'
          });
        });
      });
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

    // Write sitemap file
    const publicDir = path.join(process.cwd(), 'public');
    await fs.ensureDir(publicDir);
    await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap);

    console.log('✅ Sitemap generated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the generator
generateSitemap().catch(console.error); 