import {Expose} from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { RentOfferType } from '../../../types/rent-offer-type.enum.js';
import { Facility } from '../../../types/facility.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import { User } from '../../../types/user.type.js';

export class OfferRdo {
    @Expose()
  public title: string;

    @Expose()
    public summary: string;

    @Expose()
    public publicationDate: Date;

    @Expose()
    public city: City;

    @Expose()
    public previewPath: string;

    @Expose()
    public photos: string[];

    @Expose()
    public isPremium: boolean;

    @Expose()
    public isFavorite: boolean;

    @Expose()
    public rating: 1 | 2 | 3 | 4 | 5;

    @Expose()
    public offerType: RentOfferType;

    @Expose()
    public roomCount: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    @Expose()
    public guestCount: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

    @Expose()
    public cost: number;

    @Expose()
    public facilities: Facility[];

    @Expose()
    public author: User;

    @Expose()
    public coordinates: Coordinates;
}
