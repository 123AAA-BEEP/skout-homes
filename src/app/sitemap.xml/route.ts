import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get the host from the request headers
    const headersList = headers();
    const host = headersList.get('host') || 'www.skouthomes.com';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    console.log('🚀 Starting sitemap request');
    console.log('📍 URL:', `${baseUrl}/api/cron/generate-sitemap`);
    console.log('🔑 Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      hasCronSecret: !!process.env.CRON_SECRET,
      host: host
    });

    // Call the cron endpoint with the secret
    const response = await fetch(`${baseUrl}/api/cron/generate-sitemap`, {
      headers: {
        'x-cron-secret': process.env.CRON_SECRET || ''
      }
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Failed to fetch sitemap:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Failed to generate sitemap: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const sitemap = await response.text();
    console.log('✅ Received sitemap content length:', sitemap.length);
    console.log('📄 First 500 characters:', sitemap.substring(0, 500));

    // Return the sitemap with proper XML content type
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, must-revalidate'
      }
    });
  } catch (error: any) {
    console.error('❌ Error serving sitemap:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return new NextResponse('Sitemap not found', { status: 404 });
  }
} 