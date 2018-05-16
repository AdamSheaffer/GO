import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';
import { EventService } from './events/event.service';
import { ParkService } from './park/park.service';

export const PROVIDERS = [
  AuthService,
  AlertService,
  EventService,
  ParkService
];

export * from './auth/auth.service';
export * from './alert/alert.service';
export * from './events/event.service';
export * from './park/park.service';
