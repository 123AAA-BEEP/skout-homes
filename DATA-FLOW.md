# Data Flow Specification

**IMPORTANT: This document outlines our data architecture and flow patterns.**

## Location Data Structure

### City & Neighbourhood Data
```typescript
interface Location {
  city: {
    name: string;
    slug: string;
    neighbourhoods: Neighbourhood[];
  }
}

interface Neighbourhood {
  name: string;
  slug: string;
  city: string;
  features?: {
    description?: string;
    amenities?: string[];
    transportation?: string[];
  }
}
```

### Data Storage
```typescript
// src/data/locations.ts
export const locations: Record<string, Location> = {
  toronto: {
    name: "Toronto",
    slug: "toronto",
    neighbourhoods: [
      {
        name: "Annex",
        slug: "annex",
        city: "toronto"
      },
      // ... other neighbourhoods
    ]
  }
  // ... other cities
}
```

## Lead Capture Flow

### Lead Types
```typescript
interface Lead {
  id: string;
  timestamp: Date;
  source: string;
  intent: LeadIntent;
  contact: ContactInfo;
  location: LocationInfo;
  status: LeadStatus;
  notes?: string;
}

type LeadIntent = 
  | "buyer"
  | "seller"
  | "both"
  | "investor"
  | "information";

interface ContactInfo {
  name?: string;
  email: string;
  phone: string;
  preferredContact: "email" | "phone" | "either";
  bestTime?: string;
}

interface LocationInfo {
  city: string;
  neighbourhood?: string;
  postalCode?: string;
}

type LeadStatus = 
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "inactive";
```

### Lead Storage Architecture
```typescript
// MongoDB Schema
interface LeadSchema {
  _id: ObjectId;
  timestamp: Date;
  source: string;
  intent: LeadIntent;
  contact: {
    name?: string;
    email: string;
    phone: string;
    preferredContact: "email" | "phone" | "either";
    bestTime?: string;
  };
  location: {
    city: string;
    neighbourhood?: string;
    postalCode?: string;
  };
  status: LeadStatus;
  notes?: string;
  notifications: {
    email: {
      sent: boolean;
      attempts: number;
      lastAttempt?: Date;
      error?: string;
    };
    sms: {
      sent: boolean;
      attempts: number;
      lastAttempt?: Date;
      error?: string;
    };
  };
  metadata: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
  };
}

// MongoDB Connection
// src/lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
```

### Lead Processing Pipeline
```typescript
// src/app/api/leads/route.ts
export async function POST(req: Request) {
  try {
    const lead = await req.json();
    
    // 1. Validate lead data
    if (!validateLead(lead)) {
      throw new Error('INVALID_LEAD_DATA');
    }

    // 2. Store in MongoDB
    const mongo = await clientPromise;
    const db = mongo.db(process.env.MONGODB_DB);
    
    const result = await db.collection('leads').insertOne({
      ...lead,
      timestamp: new Date(),
      notifications: {
        email: { sent: false, attempts: 0 },
        sms: { sent: false, attempts: 0 }
      },
      metadata: {
        ip: req.headers.get('x-forwarded-for'),
        userAgent: req.headers.get('user-agent'),
        referrer: req.headers.get('referer')
      }
    });

    // 3. Queue notifications
    await queueNotifications(result.insertedId);

    return Response.json({ 
      success: true, 
      leadId: result.insertedId 
    });

  } catch (error) {
    console.error('Lead submission error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to process lead' 
    }, { status: 500 });
  }
}
```

### Notification Queue System
```typescript
// src/lib/queue.ts
interface NotificationJob {
  leadId: ObjectId;
  type: 'email' | 'sms';
  attempts: number;
  maxAttempts: number;
}

// Using Bull for queue management
import Queue from 'bull';

const notificationQueue = new Queue<NotificationJob>('notifications', {
  redis: process.env.REDIS_URL
});

// Process email notifications
notificationQueue.process('email', async (job) => {
  const { leadId } = job.data;
  const mongo = await clientPromise;
  const db = mongo.db(process.env.MONGODB_DB);
  
  try {
    const lead = await db.collection('leads').findOne({ _id: leadId });
    
    // Send email (implementation pending email service setup)
    // await sendEmail({ ... });

    // Update lead record
    await db.collection('leads').updateOne(
      { _id: leadId },
      { 
        $set: {
          'notifications.email.sent': true,
          'notifications.email.lastAttempt': new Date()
        }
      }
    );

  } catch (error) {
    // Update failed attempt
    await db.collection('leads').updateOne(
      { _id: leadId },
      { 
        $inc: { 'notifications.email.attempts': 1 },
        $set: {
          'notifications.email.lastAttempt': new Date(),
          'notifications.email.error': error.message
        }
      }
    );

    // Retry if under max attempts
    if (job.data.attempts < job.data.maxAttempts) {
      await notificationQueue.add('email', {
        ...job.data,
        attempts: job.data.attempts + 1
      }, {
        delay: 5 * 60 * 1000 // 5 minutes
      });
    }
  }
});
```

### Environment Variables
```typescript
// .env.local
MONGODB_URI=mongodb+srv://...
MONGODB_DB=skout_homes
REDIS_URL=redis://...
EMAIL_FROM=pending
EMAIL_API_KEY=pending
TWILIO_ACCOUNT_SID=pending
TWILIO_AUTH_TOKEN=pending
TWILIO_PHONE_NUMBER=pending
```

## Form Submissions

### API Endpoints
```typescript
// src/app/api/leads/route.ts
interface LeadSubmission {
  POST: {
    body: Lead;
    response: {
      success: boolean;
      leadId?: string;
      error?: string;
    }
  }
}

// Validation middleware
const validateLead = (lead: Partial<Lead>): boolean => {
  const required = [
    'email',
    'phone',
    'intent',
    'location.city'
  ];
  return required.every(field => get(lead, field));
}
```

### Error Handling
```typescript
interface APIError {
  code: string;
  message: string;
  userMessage: string;
  status: number;
}

const errorMessages = {
  INVALID_EMAIL: {
    code: 'INVALID_EMAIL',
    message: 'Invalid email format',
    userMessage: 'Please enter a valid email address',
    status: 400
  },
  INVALID_PHONE: {
    code: 'INVALID_PHONE',
    message: 'Invalid phone format',
    userMessage: 'Please enter a valid phone number',
    status: 400
  }
  // ... other error types
}
```

## Notification System

### Email Notifications
```typescript
interface EmailNotification {
  to: string;
  template: EmailTemplate;
  data: Record<string, any>;
}

type EmailTemplate =
  | "lead_notification"
  | "lead_confirmation"
  | "agent_assignment";

// Using Resend for email delivery
const sendEmail = async (notification: EmailNotification) => {
  await resend.emails.send({
    from: 'Skout Homes <leads@skouthomes.com>',
    to: notification.to,
    subject: getSubject(notification.template),
    react: getTemplate(notification.template, notification.data)
  });
}
```

### SMS Notifications
```typescript
interface SMSNotification {
  to: string;
  template: SMSTemplate;
  data: Record<string, any>;
}

// Using Twilio for SMS delivery
const sendSMS = async (notification: SMSNotification) => {
  await twilio.messages.create({
    to: notification.to,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: getSMSTemplate(notification.template, notification.data)
  });
}
```

## Data Security

### Encryption
```typescript
const encryption = {
  algorithm: 'aes-256-gcm',
  sensitiveFields: [
    'email',
    'phone',
    'postalCode'
  ]
}
```

### Data Retention
```typescript
const retentionPolicy = {
  leads: {
    active: '2 years',
    inactive: '1 year'
  },
  contactInfo: {
    duration: '2 years',
    basis: 'Business relationship'
  }
}
```

## Performance Considerations

### Caching Strategy
```typescript
const caching = {
  locations: {
    type: 'static',
    revalidate: false
  },
  neighbourhoodData: {
    type: 'static',
    revalidate: 86400 // 24 hours
  },
  leads: {
    type: 'no-cache',
    private: true
  }
}
```

### Rate Limiting
```typescript
const rateLimits = {
  leadSubmission: {
    window: '1h',
    max: 10,
    perIp: true
  },
  emailNotifications: {
    window: '24h',
    max: 5,
    perEmail: true
  }
}
```

---

*This document defines our data architecture and flow patterns. All implementations must follow these specifications for consistency and security.* 