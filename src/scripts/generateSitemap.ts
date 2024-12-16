import * as fs from 'fs-extra';
import * as path from 'path';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

async function generateSitemap() {
  try {
    const baseUrl = 'https://skouthomes.com'; // Your production domain
    const urls: SitemapUrl[] = [];

    // Add static pages
    urls.push(
      { loc: `${baseUrl}`, priority: 1.0, changefreq: 'daily' },
      { loc: `${baseUrl}/find-realtor`, priority: 0.9, changefreq: 'weekly' },
      { loc: `${baseUrl}/tools/home-value-estimator`, priority: 0.8, changefreq: 'weekly' },
      { loc: `${baseUrl}/tools/land-transfer-tax-calculator`, priority: 0.8, changefreq: 'weekly' }
    );

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