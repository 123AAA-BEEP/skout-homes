import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Lead, validateLead } from '@/models/Lead';

export async function POST(request: Request) {
  console.log('API: Starting lead submission...');
  
  try {
    console.log('API: Parsing request body...');
    const data = await request.json();
    console.log('API: Received data:', data);
    
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
    console.log('API: Created lead object:', lead);

    // Validate using Lead model validation
    const validation = validateLead(lead);
    if (!validation.isValid) {
      console.log('API: Lead validation failed:', validation.errors);
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.errors.map(e => e.message).join(', ')
        },
        { status: 400 }
      );
    }

    console.log('API: Attempting MongoDB connection...');
    // Connect to MongoDB
    const client = await clientPromise;
    console.log('API: MongoDB connection successful');
    
    const db = client.db(process.env.MONGODB_DB);
    console.log('API: Selected database:', process.env.MONGODB_DB);
    
    // Insert into database
    console.log('API: Attempting to insert lead...');
    const result = await db.collection('leads').insertOne(lead);
    console.log('API: Insert result:', result);

    if (!result.insertedId) {
      console.log('API: Insert failed - no insertedId');
      throw new Error('Failed to insert lead');
    }
    
    console.log('API: Lead successfully created');
    return NextResponse.json({ 
      success: true,
      leadId: result.insertedId,
      message: 'Lead successfully created'
    });

  } catch (error: any) {
    console.error('API Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // More specific error messages based on error type
    if (error.name === 'MongoNetworkError') {
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
        message: error.message || 'Failed to process lead. Please try again.'
      },
      { status: 500 }
    );
  }
} 