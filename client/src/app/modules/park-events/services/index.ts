import { LocationService } from './location/location.service';
import { ParkResolverService } from './park-resolver/park-resolver.service';

export const PROVIDERS = [
  LocationService,
  ParkResolverService
];

export * from './location/location.service';
export * from './park-resolver/park-resolver.service';
