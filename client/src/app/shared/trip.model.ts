import { Location } from './location.model';
import { Park } from './park.model';

export class Trip {
    _id: string
    comments: string;
    createdDate: Date;
    park: any;
    photos: string[];
    rating: number;
    tripDate: Date;
    user: string;
}