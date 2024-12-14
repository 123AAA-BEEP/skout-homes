import { torontoNorth } from '../data/locations/toronto-north.mjs';
import { torontoEast } from '../data/locations/toronto-east.mjs';
import { torontoWest } from '../data/locations/toronto-west.mjs';

// Combine all Toronto neighborhoods
const toronto = {
  ...torontoNorth,
  ...torontoEast,
  ...torontoWest
};

// Define Mississauga neighborhoods (placeholder)
const mississauga = {
  'port-credit': createLocation('Port Credit', 'mississauga-port-credit'),
  'streetsville': createLocation('Streetsville', 'mississauga-streetsville'),
  'erin-mills': createLocation('Erin Mills', 'mississauga-erin-mills'),
  'cooksville': createLocation('Cooksville', 'mississauga-cooksville'),
  'meadowvale': createLocation('Meadowvale', 'mississauga-meadowvale')
};

// Export consolidated locations
export const locations = {
  toronto,
  mississauga
}; 