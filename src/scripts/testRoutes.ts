import clientPromise from '../lib/mongodb';

async function testRoutes() {
  try {
    console.log('Testing dynamic routes...');
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Get all areas
    const areas = await db.collection('areas').find({}).toArray();
    console.log(`Found ${areas.length} areas`);
    
    // Test routes for each area
    for (const area of areas) {
      console.log(`\nTesting routes for ${area.name}:`);
      
      // Base area route
      console.log(`✓ Area page: ${area.seo.urlPatterns.base}`);
      
      // Test buying routes
      if (area.seo.intents.buying) {
        console.log('Testing buying routes:');
        console.log(`✓ Main buying page: ${area.seo.urlPatterns.buying}`);
        
        // Test property type routes
        const propertyTypes = area.seo.intents.buying.propertyTypes || {};
        for (const [type, data] of Object.entries(propertyTypes)) {
          if (data.urlSlug) {
            console.log(`✓ Property type: ${area.seo.urlPatterns.buying}/${data.urlSlug}`);
          }
        }
      }
      
      // Test selling routes
      if (area.seo.intents.selling) {
        console.log('Testing selling routes:');
        console.log(`✓ Main selling page: ${area.seo.urlPatterns.selling}`);
        
        // Test urgency routes
        const urgencyTypes = area.seo.intents.selling.urgency || {};
        for (const [type, data] of Object.entries(urgencyTypes)) {
          if (data.urlSlug) {
            console.log(`✓ Urgency type: ${area.seo.urlPatterns.selling}/${data.urlSlug}`);
          }
        }
      }
      
      // Test agent routes
      if (area.seo.intents.agentSearch) {
        console.log('Testing agent routes:');
        console.log(`✓ Main agent page: ${area.seo.urlPatterns.agentSearch}`);
        
        // Test specialty routes
        const specialties = area.seo.intents.agentSearch.specialties || {};
        for (const [type, data] of Object.entries(specialties)) {
          if (data.urlSlug) {
            console.log(`✓ Agent specialty: ${area.seo.urlPatterns.agentSearch}/${data.urlSlug}`);
          }
        }
        
        // Test language routes
        const languages = area.seo.intents.agentSearch.languages || {};
        for (const [lang, data] of Object.entries(languages)) {
          if (data.urlSlug) {
            console.log(`✓ Agent language: ${area.seo.urlPatterns.agentSearch}/${data.urlSlug}`);
          }
        }
      }
      
      // Test service routes
      const services = ['evaluation', 'consultation', 'marketAnalysis'];
      for (const service of services) {
        if (area.seo.urlPatterns[service]) {
          console.log(`✓ Service page: ${area.seo.urlPatterns[service]}`);
        }
      }
    }
    
    console.log('\nRoute testing complete');
    await client.close();
    
  } catch (error) {
    console.error('Error testing routes:', error);
    process.exit(1);
  }
}

testRoutes(); 