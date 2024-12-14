import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set up environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env.local') });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const client = new MongoClient(uri);

const specialtyLanguageKeywords = {
  chinese: ['chinese-speaking-realtor', 'mandarin-speaking-agent', 'cantonese-speaking-agent'],
  farsi: ['farsi-speaking-realtor', 'persian-speaking-agent'],
  hindi: ['hindi-speaking-agent'],
  punjabi: ['punjabi-speaking-agent'],
  urdu: ['urdu-speaking-agent']
};

const lifeEventKeywords = [
  'divorce-real-estate-agent',
  'estate-sale-realtor',
  'probate-sale-agent',
  'relocation-specialist',
  'downsizing-realtor',
  'upsizing-agent',
  'retirement-home-realtor',
  'senior-real-estate-specialist',
  'military-relocation-agent',
  'corporate-relocation-specialist'
];

const propertySpecificKeywords = [
  'luxury-home-specialist',
  'waterfront-property-agent',
  'condo-expert-realtor',
  'townhouse-specialist',
  'investment-property-realtor',
  'commercial-real-estate-agent',
  'pre-construction-specialist',
  'new-build-expert',
  'heritage-home-specialist',
  'fixer-upper-expert'
];

const experienceKeywords = [
  'experienced-realtor',
  'award-winning-agent',
  'top-producing-agent',
  'million-dollar-agent',
  'platinum-agent',
  'diamond-agent',
  'veteran-realtor',
  'seasoned-real-estate-agent',
  'certified-luxury-agent',
  'accredited-realtor'
];

async function updateAreaSpecialties(collection, area) {
  const updates = {
    'seo.intents.agentSearch.languages': Object.entries(specialtyLanguageKeywords).reduce((acc, [lang, keywords]) => ({
      ...acc,
      [lang]: {
        type: `${lang.charAt(0).toUpperCase() + lang.slice(1)} Speaking`,
        description: `Find ${lang}-speaking real estate agents in ${area.name} for seamless communication.`,
        keywords: keywords,
        urlSlug: `${lang}-speaking-agent`
      }
    }), {}),
    'seo.intents.situations': {
      relocation: {
        title: `Relocation Real Estate Specialists in ${area.name}`,
        description: `Expert relocation assistance for moving to or from ${area.name}. Get professional guidance throughout your move.`,
        keywords: lifeEventKeywords.filter(k => k.includes('relocation')),
        urlSlug: 'relocation'
      },
      retirement: {
        title: `Retirement Real Estate in ${area.name}`,
        description: `Specialized real estate services for retirees in ${area.name}. Expert guidance for your retirement move.`,
        keywords: lifeEventKeywords.filter(k => k.includes('retirement') || k.includes('senior')),
        urlSlug: 'retirement'
      },
      divorce: {
        title: `Divorce Real Estate Specialists in ${area.name}`,
        description: `Sensitive and professional real estate services for divorce situations in ${area.name}.`,
        keywords: lifeEventKeywords.filter(k => k.includes('divorce')),
        urlSlug: 'divorce'
      }
    },
    'seo.intents.agentSearch.specialties': {
      luxury: {
        type: 'Luxury',
        description: `Specialized agents for luxury properties in ${area.name}.`,
        keywords: propertySpecificKeywords.filter(k => k.includes('luxury')),
        urlSlug: 'luxury-specialist'
      },
      investment: {
        type: 'Investment',
        description: `Expert guidance for property investment in ${area.name}.`,
        keywords: propertySpecificKeywords.filter(k => k.includes('investment')),
        urlSlug: 'investment-specialist'
      },
      commercial: {
        type: 'Commercial',
        description: `Specialized commercial real estate agents in ${area.name}.`,
        keywords: propertySpecificKeywords.filter(k => k.includes('commercial')),
        urlSlug: 'commercial-specialist'
      }
    },
    'seo.intents.agentSearch.experience': {
      topRated: {
        title: `Top-Rated Real Estate Agents in ${area.name}`,
        description: `Work with the most highly rated and experienced agents in ${area.name}.`,
        keywords: experienceKeywords.filter(k => k.includes('top') || k.includes('award')),
        urlSlug: 'top-rated'
      },
      experienced: {
        title: `Experienced Real Estate Agents in ${area.name}`,
        description: `Connect with seasoned real estate professionals in ${area.name}.`,
        keywords: experienceKeywords.filter(k => k.includes('experienced') || k.includes('seasoned')),
        urlSlug: 'experienced'
      },
      certified: {
        title: `Certified Real Estate Specialists in ${area.name}`,
        description: `Work with certified and accredited real estate professionals in ${area.name}.`,
        keywords: experienceKeywords.filter(k => k.includes('certified') || k.includes('accredited')),
        urlSlug: 'certified'
      }
    }
  };

  try {
    await collection.updateOne(
      { _id: area._id },
      { $set: updates }
    );
    console.log(`Updated specialties for ${area.name}`);
  } catch (err) {
    console.error(`Error updating ${area.name}:`, err);
  }
}

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('areas');

    const areas = await collection.find({}).toArray();
    console.log(`Found ${areas.length} areas to update`);

    for (const area of areas) {
      await updateAreaSpecialties(collection, area);
    }

    console.log('Phase 2 migration completed');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

main().catch(console.error); 