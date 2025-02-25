import { City } from '../../types/city.enum.js';
import { Facility } from '../../types/facility.enum.js';
import { RentOfferType } from '../../types/rent-offer-type.enum.js';
import { RentOffer } from '../../types/rent-offer.type.js';
import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): RentOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        summary,
        publicationDate,
        city,
        preview,
        photos,
        isPremium,
        isFavorite,
        rating,
        offerType,
        roomCount,
        guestCount,
        cost,
        facilities,
        authorName,
        authorEmail,
        authorAvatar,
        commentCount,
        coordinates,
      ]) => ({
        title,
        summary,
        publicationDate: new Date(publicationDate),
        city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewPath: preview,
        photos: photos.split(';'),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: Number.parseFloat(rating),
        offerType: RentOfferType[offerType as 'Apartment'| 'House' | 'Room' | 'Hotel'],
        roomCount: Number.parseInt(roomCount, 10),
        guestCount: Number.parseInt(guestCount, 10),
        cost: Number.parseInt(cost, 10),
        facilities: facilities.split(';')
          .map((facility) => Facility[
            facility as 'Breakfast' |
            'AirConditioning' |
            'LaptopFriendlyWorkspace' |
            'BabySeat' |
            'Washer' |
            'Towels' |
            'Fridge'
          ]),
        author: {
          name: authorName,
          email: authorEmail,
          avatarPath: authorAvatar,
        },
        commentCount: Number(commentCount),
        coordinates: {
          latitude: coordinates.split(';')[0],
          longitude: coordinates.split(';')[1],
        },
      }));
  }
}
