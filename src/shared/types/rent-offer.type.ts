import { City } from './city.enum.js';
import { Coordinates } from './coordinates.type.js';
import { Facility } from './facility.enum.js';
import { RentOfferType } from './rent-offer-type.enum.js';
import { User } from './user.type.js';

export type RentOffer = {
    title: string;
    summary: string;
    publicationDate: Date;
    city: City;
    previewPath: string;
    photos: string[];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    offerType: RentOfferType;
    roomCount: number;
    guestCount: number;
    cost: number;
    facilities: Facility[];
    author: User;
    commentCount: number;
    coordinates: Coordinates;
}