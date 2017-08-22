import { Location } from './location.model';

export class TicketQuery {
    coords?: Location;
    range?: number;
    beginDate?: string;
    endDate?: string;
    minPrice?: number;
    maxPrice?: number;
    page: number = 1;
    sortBy?: string;
}