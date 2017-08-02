import { Park } from './park.model';

export class Event {
    datetime_local: string;
    id: number;
    performers: any[];
    short_title: string;
    stats: Object;
    title: string;
    url: string;
    venue: Park;
}