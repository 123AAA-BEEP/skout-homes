import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Lead, validateLead } from '@/models/Lead';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create lead object with all required fields
    const lead: Partial<Lead> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      area: data.area || 'Toronto',
      type: data.type || 'connect',
      status: 'new',
      createdAt: new Date(),
      source: data.source || 'website'
    };

    // Validate using Lead model validation
    const validation = validateLead(lead);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.errors.map(e => e.message).join(', ')
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Insert into database
    const result = await db.collection('leads').insertOne(lead);

    if (!result.insertedId) {
      throw new Error('Failed to insert lead');
    }
    
    return NextResponse.json({ 
      success: true,
      leadId: result.insertedId,
      message: 'Lead successfully created'
    });

  } catch (error) {
    const err = error as Error;
    
    if (err.name === 'MongoNetworkError') {
      return NextResponse.json(
        { 
          error: 'Database connection error',
          message: 'Unable to connect to database. Please try again.'
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: err.message || 'Failed to process lead. Please try again.'
      },
      { status: 500 }
    );
  }
} 