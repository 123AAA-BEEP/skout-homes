import { NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function GET() {
  try {
    // Read the sitemap file from the public directory
    const publicDir = path.join(process.cwd(), 'public');
    const sitemap = await fs.readFile(path.join(publicDir, 'sitemap.xml'), 'utf-8');

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