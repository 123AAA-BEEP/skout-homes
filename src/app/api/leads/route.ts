import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Lead, validateLead } from '@/models/Lead';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create lead object
    const lead: Partial<Lead> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      area: data.area,
      type: data.type || 'buyer', // Default to buyer if not specified
      propertyType: data.propertyType,
      urgency: data.urgency,
      specialty: data.specialty,
      createdAt: new Date(),
      status: 'new'
    };

    // Validate lead data
    const validation = validateLead(lead);
    if (!validation.isValid) {
      console.error('Invalid lead data:', {
        data,
        errors: validation.errors
      });
      
      return NextResponse.json(
        { 
          error: 'Invalid lead data',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Insert into database
    const result = await db.collection('leads').insertOne(lead as Lead);

    if (!result.insertedId) {
      throw new Error('Failed to insert lead');
    }

    // TODO: Add email notification here
    // We should add a background job for this to avoid blocking the response
    
    return NextResponse.json({ 
      success: true,
      leadId: result.insertedId,
      message: 'Lead successfully created'
    });
    
  } catch (error) {
    console.error('Error handling lead:', error);
    
    // Determine if it's a client error or server error
    const isClientError = error instanceof Error && 
      (error.message.includes('validation') || error.message.includes('invalid'));
    
    return NextResponse.json(
      { 
        error: isClientError ? 'Invalid request' : 'Internal server error',
        message: isClientError ? error.message : 'An unexpected error occurred',
        details: error instanceof Error ? error.message : undefined
      },
      { status: isClientError ? 400 : 500 }
    );
  }
} 