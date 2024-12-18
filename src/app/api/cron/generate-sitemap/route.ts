import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import { Area } from '@/models/Area';

export const dynamic = 'force-dynamic';

// All possible intent keywords organized by category
const intentKeywords = {
  directAgentSearch: [
    'real-estate-agent', 'realtor', 'top-realtor', 'best-realtor', 'experienced-realtor',
    'local-realtor', 'trusted-realtor', 'recommended-realtor', 'top-rated-agent',
    'best-real-estate-agent', 'experienced-agent', 'local-agent', 'trusted-agent',
    'recommended-agent'
  ],
  transactionSpecific: [
    'selling-agent', 'listing-agent', 'sellers-realtor', 'home-selling-agent',
    'buying-agent', 'buyers-agent', 'buyers-realtor', 'home-buying-agent',
    'first-time-buyer-agent', 'luxury-home-realtor', 'investment-property-agent',
    'condo-specialist', 'house-specialist', 'townhouse-specialist'
  ],
  specialtyAgent: [
    'multilingual-realtor', 'chinese-speaking-realtor', 'mandarin-speaking-agent',
    'cantonese-speaking-agent', 'farsi-speaking-realtor', 'persian-speaking-agent',
    'hindi-speaking-agent', 'punjabi-speaking-agent', 'urdu-speaking-agent'
  ],
  serviceSpecific: [
    'free-home-evaluation', 'free-house-valuation', 'property-value-estimate',
    'what-is-my-home-worth', 'sell-my-house', 'sell-my-home', 'list-my-house',
    'list-my-property', 'help-selling-house', 'help-buying-house',
    'find-realtor-to-sell', 'find-realtor-to-buy'
  ],
  expertAdvisory: [
    'real-estate-consultation', 'real-estate-advice', 'housing-market-expert',
    'property-selling-expert', 'home-buying-expert', 'real-estate-specialist',
    'market-value-expert', 'neighbourhood-expert', 'local-market-expert'
  ],
  propertySpecific: [
    'luxury-home-specialist', 'waterfront-property-agent', 'condo-expert-realtor',
    'townhouse-specialist', 'investment-property-realtor', 'commercial-real-estate-agent',
    'pre-construction-specialist', 'new-build-expert', 'heritage-home-specialist',
    'fixer-upper-expert'
  ]
};

// Flatten all intent keywords into a single array
const allIntentKeywords = Object.values(intentKeywords).flat();

export async function GET() {
  try {
    // Verify cron secret
    const headersList = headers();
    const cronSecret = headersList.get('x-cron-secret');
    
    console.log('Received cron secret:', cronSecret ? 'present' : 'missing');
    console.log('Environment CRON_SECRET:', process.env.CRON_SECRET ? 'present' : 'missing');
    
    if (!process.env.CRON_SECRET || cronSecret !== process.env.CRON_SECRET) {
      console.error('Authentication failed:', {
        hasCronSecret: !!process.env.CRON_SECRET,
        headerPresent: !!cronSecret,
        matches: cronSecret === process.env.CRON_SECRET
      });
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('Starting sitemap generation...');
    const baseUrl = 'https://skouthomes.com';
    const urls = [];
    const today = new Date().toISOString().split('T')[0];
    let urlCount = 0;

    // Add static pages
    const staticPages = [
      { path: '', priority: 1.0 },
      { path: 'find-realtor', priority: 0.9 },
      { path: 'tools/home-value-estimator', priority: 0.8 },
      { path: 'tools/land-transfer-tax-calculator', priority: 0.8 }
    ];

    staticPages.forEach(page => {
      urls.push({
        loc: `${baseUrl}/${page.path}`,
        priority: page.priority,
        changefreq: 'daily',
        lastmod: today
      });
      urlCount++;
    });
    console.log(`Added ${staticPages.length} static pages`);

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Get all published areas
    console.log('Fetching published areas...');
    const areas = await db.collection<Area>('areas')
      .find({ isPublished: true })
      .toArray();
    console.log(`Found ${areas.length} published areas`);

    // Get unique cities
    const cities = Array.from(new Set(areas.map(area => area.urlStructure.city)));
    console.log(`Found ${cities.length} unique cities`);

    // Add city pages
    cities.forEach(city => {
      urls.push({
        loc: `${baseUrl}/${city.toLowerCase()}`,
        priority: 0.9,
        changefreq: 'daily',
        lastmod: today
      });
      urlCount++;
    });

    // Process each area
    for (const area of areas) {
      const { city, neighborhood } = area.urlStructure;
      if (!city || !neighborhood) {
        console.warn(`Skipping area ${area._id} due to missing URL structure`);
        continue;
      }

      const baseAreaUrl = `${baseUrl}/${city.toLowerCase()}/${neighborhood.toLowerCase()}`;
      
      // Add main area page
      urls.push({
        loc: baseAreaUrl,
        priority: 0.8,
        changefreq: 'daily',
        lastmod: area.updatedAt?.toISOString().split('T')[0] || today
      });
      urlCount++;

      // Add all intent-based pages
      allIntentKeywords.forEach(intent => {
        urls.push({
          loc: `${baseAreaUrl}/${intent}`,
          priority: 0.7,
          changefreq: 'daily',
          lastmod: area.updatedAt?.toISOString().split('T')[0] || today
        });
        urlCount++;
      });
    }

    console.log(`Generated ${urlCount} total URLs`);

    // Generate sitemap XML with XSL styling
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

    console.log('✅ Sitemap generated successfully');
    console.log(`📊 Statistics:`);
    console.log(`- Total URLs: ${urlCount}`);
    console.log(`- Cities: ${cities.length}`);
    console.log(`- Areas: ${areas.length}`);
    console.log(`- Intent keywords: ${allIntentKeywords.length}`);

    // Return the sitemap directly as XML
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error: any) { // Type assertion to handle error properties
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      phase: 'sitemap generation'
    });
    return new NextResponse(`Error generating sitemap: ${error.message}`, { status: 500 });
  }
} 