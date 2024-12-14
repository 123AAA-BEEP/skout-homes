import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import type { Lead } from '@/models/Lead';
import { createDbError } from '@/types/errors';

export async function getDb() {
  try {
    const client = await clientPromise;
    return client.db(process.env.MONGODB_DB);
  } catch (error) {
    throw createDbError(
      'Failed to connect to database',
      'connection',
      error instanceof Error ? error : undefined
    );
  }
}

export async function insertLead(lead: Omit<Lead, '_id'>) {
  try {
    const db = await getDb();
    const result = await db.collection('leads').insertOne(lead);
    if (!result.insertedId) {
      throw createDbError('Failed to insert lead', 'operation');
    }
    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes('duplicate key error')) {
      throw createDbError(
        'A lead with this email already exists',
        'validation',
        error,
        'DUPLICATE_EMAIL'
      );
    }
    throw createDbError(
      'Database operation failed',
      'operation',
      error instanceof Error ? error : undefined
    );
  }
}

export async function getLeadById(id: string) {
  try {
    const db = await getDb();
    const lead = await db.collection('leads').findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!lead) {
      throw createDbError(
        'Lead not found',
        'operation',
        undefined,
        'NOT_FOUND'
      );
    }
    
    return lead as Lead;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Lead not found')) {
      throw error;
    }
    throw createDbError(
      'Failed to fetch lead',
      'operation',
      error instanceof Error ? error : undefined
    );
  }
}

export async function updateLeadStatus(id: string, status: Lead['status']) {
  try {
    const db = await getDb();
    const result = await db.collection('leads').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status, 
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      throw createDbError(
        'Lead not found',
        'operation',
        undefined,
        'NOT_FOUND'
      );
    }

    if (result.modifiedCount === 0) {
      throw createDbError(
        'Lead status not updated',
        'operation',
        undefined,
        'NOT_MODIFIED'
      );
    }

    return result;
  } catch (error) {
    throw createDbError(
      'Failed to update lead status',
      'operation',
      error instanceof Error ? error : undefined
    );
  }
} 