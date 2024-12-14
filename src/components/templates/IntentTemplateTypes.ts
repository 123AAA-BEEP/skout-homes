export interface IntentTemplateType {
    title: string;
    description: string;
    callToAction: string;
}

export function getIntentTemplateDefaults(intent: string): IntentTemplateType {
    const templates: Record<string, IntentTemplateType> = {
        'sell-house': {
            title: 'Sell Your House',
            description: 'Get the best value for your property',
            callToAction: 'Get a Free Evaluation'
        },
        'buy-house': {
            title: 'Buy a House',
            description: 'Find your dream home',
            callToAction: 'View Listings'
        },
        'invest': {
            title: 'Investment Properties',
            description: 'Find lucrative real estate investments',
            callToAction: 'View Investment Opportunities'
        },
        'rent': {
            title: 'Rental Properties',
            description: 'Find your perfect rental home',
            callToAction: 'View Rentals'
        },
        'agents': {
            title: 'Real Estate Agents',
            description: 'Connect with experienced local agents',
            callToAction: 'Find an Agent'
        },
        'home-evaluation': {
            title: 'Home Value Estimator',
            description: 'Get an estimate of your home\'s value',
            callToAction: 'Get Free Evaluation'
        },
        'consultation': {
            title: 'Real Estate Consultation',
            description: 'Get expert advice for your real estate needs',
            callToAction: 'Book Consultation'
        }
    };

    return templates[intent] || {
        title: 'Real Estate Services',
        description: 'Professional real estate services',
        callToAction: 'Contact Us'
    };
} 