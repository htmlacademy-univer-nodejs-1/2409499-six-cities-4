import { City } from '../../../types/city.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import { Facility } from '../../../types/facility.enum.js';
import { RentOfferType } from '../../../types/rent-offer-type.enum.js';
import { User } from '../../../types/user.type.js';

export default class CreateRentOfferDto {
  public title: string;
  public summary: string;
  public publicationDate: Date;
  public city: City;
  public previewPath: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: 1 | 2 | 3 | 4 | 5;
  public offerType: RentOfferType;
  public roomCount: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  public guestCount: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  public cost: number;
  public facilities: Facility[];
  public author: User;
  public commentCount: number;
  public coordinates: Coordinates;
}
