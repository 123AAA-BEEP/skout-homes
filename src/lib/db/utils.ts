import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import type { Lead } from '@/models/Lead';

export interface DbError {
  code: string;
  message: string;
  details?: {
    error?: any;
    errorCode?: string;
  };
}

export function isDbError(error: any): error is DbError {
  return (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error
  );
}

export function createDbError(code: string, message: string, details?: any): DbError {
  return {
    code,
    message,
    details: typeof details === 'object' ? details : { error: details }
  };
}

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
        'DUPLICATE_EMAIL',
        'A lead with this email already exists',
        { error, errorCode: 'validation' }
      );
    }
    throw createDbError(
      'DB_ERROR',
      'Database operation failed',
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
        'NOT_FOUND',
        'Lead not found',
        { errorCode: 'operation' }
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
        'NOT_FOUND',
        'Lead not found',
        { errorCode: 'operation' }
      );
    }

    if (result.modifiedCount === 0) {
      throw createDbError(
        'NOT_MODIFIED',
        'Lead status not updated',
        { errorCode: 'operation' }
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