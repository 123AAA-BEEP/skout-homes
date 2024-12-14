import { torontoCore } from './toronto-core.mjs';
import { torontoNorth } from './toronto-north.mjs';
import { torontoEast } from './toronto-east.mjs';
import { torontoWest } from './toronto-west.mjs';
import { mississauga } from './mississauga.mjs';
import { vaughan, markham, richmond_hill, oakville, burlington } from './gta-cities.mjs';

// Combine all Toronto neighborhoods
const toronto = {
  ...torontoCore,
  ...torontoNorth,
  ...torontoEast,
  ...torontoWest
};

// Export all locations
export const locations = {
  toronto,
  mississauga,
  vaughan,
  markham,
  richmond_hill,
  oakville,
  burlington
}; 