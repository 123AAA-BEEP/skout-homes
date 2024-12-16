import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import clientPromise from '@/lib/mongodb';

// Basic auth middleware
async function authenticate(req: Request) {
  const headersList = headers();
  const authorization = headersList.get('authorization');

  if (!authorization || !authorization.startsWith('Basic ')) {
    return false;
  }

  const base64Credentials = authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  return username === process.env.ADMIN_USERNAME && 
         password === process.env.ADMIN_PASSWORD;
}

export async function GET(req: Request) {
  try {
    // Check authentication
    const isAuthenticated = await authenticate(req);
    if (!isAuthenticated) {
      return new Response('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Access"',
        },
      });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Fetch leads (most recent first)
    const leads = await db.collection('leads')
      .find({})
      .sort({ timestamp: -1 })
      .limit(100)  // Limit to last 100 leads
      .toArray();

    return NextResponse.json({ leads });

  } catch (error) {
    console.error('Admin leads fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';