import { Park } from './park.model';

export class Event {
    datetime_local: string;
    id: number;
    performers: { homeTeam: Object, awayTeam: Object };
    short_title: string;
    stats: Object;
    title: string;
    url: string;
    venue: Park;
    isActive: boolean = false;
}