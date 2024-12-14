import clientPromise from '../lib/mongodb.js';

async function testUrls() {
  console.log('Testing URL patterns...');
  
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const areas = await db.collection('areas').find({}).toArray();
    
    console.log(`Testing ${areas.length} areas...`);
    
    for (const area of areas) {
      console.log(`\nTesting ${area.name}:`);
      
      // Test base URL
      console.log(`✓ Base URL: ${area.seo.urlPatterns.base}`);
      
      // Test intent URLs
      const intents = ['buying', 'selling', 'investing', 'renting'];
      for (const intent of intents) {
        if (area.seo.intents[intent]) {
          console.log(`✓ ${intent} URL: ${area.seo.urlPatterns[intent]}`);
        }
      }
      
      // Test agent URLs
      if (area.seo.intents.agentSearch) {
        console.log(`✓ Agent Search URL: ${area.seo.urlPatterns.agentSearch}`);
        
        // Test specialty agent URLs
        for (const [key, specialty] of Object.entries(area.seo.intents.agentSearch.specialties || {})) {
          if (specialty.urlSlug) {
            console.log(`✓ ${key} Agent URL: ${area.seo.urlPatterns.base}/${specialty.urlSlug}`);
          }
        }
        
        // Test language agent URLs
        for (const [key, language] of Object.entries(area.seo.intents.agentSearch.languages || {})) {
          if (language.urlSlug) {
            console.log(`✓ ${key} Agent URL: ${area.seo.urlPatterns.base}/${language.urlSlug}`);
          }
        }
      }
      
      // Test service URLs
      const services = ['evaluation', 'consultation', 'marketAnalysis'];
      for (const service of services) {
        if (area.seo.urlPatterns[service]) {
          console.log(`✓ ${service} URL: ${area.seo.urlPatterns[service]}`);
        }
      }
    }
    
    console.log('\nURL testing complete');
    await client.close();
    
  } catch (error) {
    console.error('Error testing URLs:', error);
    process.exit(1);
  }
}

testUrls(); 