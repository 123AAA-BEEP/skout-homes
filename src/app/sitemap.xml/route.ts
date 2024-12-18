import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Call the cron endpoint with the secret
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cron/generate-sitemap`, {
      headers: {
        'x-cron-secret': process.env.CRON_SECRET || ''
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to generate sitemap: ${response.statusText}`);
    }

    const sitemap = await response.text();

    // Return the sitemap with proper XML content type
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Error serving sitemap:', error);
    return new NextResponse('Sitemap not found', { status: 404 });
  }
} 