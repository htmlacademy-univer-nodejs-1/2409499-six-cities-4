import { City } from '../types/city.enum.js';
import { Facility } from '../types/facility.enum.js';
import { RentOfferType } from '../types/rent-offer-type.enum.js';
import { RentOffer } from '../types/rent-offer.type.js';
import { User } from '../types/user.type.js';

export function createOffer(offerData: string): RentOffer {
  const [
    title,
    summary,
    publicationDate,
    city,
    previewPath,
    photos,
    isPremium,
    isFavorite,
    rating,
    rentOfferType,
    roomCount,
    guestCount,
    cost,
    facilities,
    name,
    email,
    avatarPath,
    commentCount,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  const author: User = {
    email,
    name,
    avatarPath
  };

  const [latitude, longitude] = coordinates.split(';');

  return {
    title,
    summary,
    publicationDate: new Date(publicationDate),
    city: City[city as 'Amsterdam' | 'Brussels' | 'Cologne' | 'Dusseldorf' | 'Hamburg' | 'Paris'],
    previewPath,
    photos: photos.split(';'),
    isPremium: isPremium as unknown as boolean,
    isFavorite: isFavorite as unknown as boolean,
    rating: Number.parseFloat(rating),
    offerType: RentOfferType[rentOfferType as 'Apartment' | 'Hotel' | 'House' | 'Room'],
    roomCount: Number.parseInt(roomCount, 10),
    guestCount: Number.parseInt(guestCount, 10),
    cost: Number.parseInt(cost, 10),
    facilities: facilities.split(';')
      .map((facility) => Facility[facility as 'Fridge' |
        'Towels' | 'Washer' | 'BabySeat' |
        'LaptopFriendlyWorkspace' | 'AirConditioning' | 'Breakfast']),
    author,
    commentCount: Number.parseInt(commentCount, 10),
    coordinates: {
      latitude,
      longitude,
    },
  } as RentOffer;
}
