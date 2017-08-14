import { SeatGeekPark } from './seatgeek-park.model';

export class Event {
    datetime_local: string;
    id: number;
    performers: { homeTeam: any, awayTeam: any };
    short_title: string;
    stats: Object;
    title: string;
    url: string;
    venue: SeatGeekPark;
    isActive: boolean = false;
}