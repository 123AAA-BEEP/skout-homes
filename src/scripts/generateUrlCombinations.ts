import * as fs from 'fs-extra';
import * as path from 'path';

// Types
type Neighbourhood = string;
type City = string;

interface UrlCombination {
    city: string;
    neighbourhood: string;
    intent: string;
    url: string;
}

// Constants
const intentKeywords = [
    'sell-house',
    'buy-house',
    'real-estate-agent',
    'free-home-evaluation',
    'market-analysis'
];

const cities: City[] = [
    'Toronto',
    'Mississauga',
    'Vaughan',
    'Oakville',
    'Burlington',
    'Brampton',
    'Milton',
    'Halton Hills',
    'Markham'
];

// Utility functions
function cleanForUrl(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}

async function generateUrlCombinations(): Promise<void> {
    try {
        // Ensure directories exist
        await fs.ensureDir(path.join(process.cwd(), 'src/data'));

        // Read locations file
        const locationsPath = path.join(process.cwd(), 'LOCATIONS.md');
        const locationsContent = await fs.readFile(locationsPath, 'utf8');

        // Extract neighbourhoods (simple extraction)
        const neighbourhoods: Neighbourhood[] = locationsContent
            .split('\n')
            .filter(line => line.trim().startsWith('- '))
            .map(line => line.replace('- ', '').trim());

        const combinations: UrlCombination[] = [];

        // Generate combinations
        cities.forEach(city => {
            neighbourhoods.forEach(neighbourhood => {
                intentKeywords.forEach(intent => {
                    combinations.push({
                        city,
                        neighbourhood,
                        intent,
                        url: `/${cleanForUrl(city)}/${cleanForUrl(neighbourhood)}/${intent}`
                    });
                });
            });
        });

        // Save results
        const outputPath = path.join(process.cwd(), 'src/data/urlCombinations.json');
        await fs.writeJson(outputPath, combinations, { spaces: 2 });

        console.log(`✅ Generated ${combinations.length} URL combinations`);
        console.log('\nSample URLs:');
        combinations.slice(0, 5).forEach(combo => console.log(combo.url));

    } catch (error) {
        console.error('Error generating URL combinations:', error);
        process.exit(1);
    }
}

// Execute the function
generateUrlCombinations().catch(console.error); 