import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { City } from '../../types/city.enum.js';
import { RentOfferType } from '../../types/rent-offer-type.enum.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const summary = getRandomItem<string>(this.mockData.summaries);
    const city = getRandomItem<City>([
      City.Amsterdam,
      City.Brussels,
      City.Cologne,
      City.Dusseldorf,
      City.Hamburg,
      City.Paris,
    ]);
    const previewPath = getRandomItem(this.mockData.previewPathes);
    const photos = getRandomItems(this.mockData.photos);
    const isPremium = getRandomItem([true, false]);
    const isFavorite = getRandomItem([true, false]);
    const rating = getRandomItem([1, 2, 3, 4, 5]);
    const offerType = getRandomItem([
      RentOfferType.Apartment,
      RentOfferType.Hotel,
      RentOfferType.House,
      RentOfferType.Room,
    ]);
    const roomCount = getRandomItem([1, 2, 3, 4, 5, 6, 7, 8]);
    const guestCount = getRandomItem([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const cost = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItem(this.mockData.facilities);
    const author = getRandomItem(this.mockData.authors);
    const commentCount = getRandomItem(this.mockData.commentCounts);
    const coordinates = getRandomItem(this.mockData.coordinates);

    const publicationDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [title, summary, publicationDate, city, previewPath, photos,
      isPremium, isFavorite, rating, offerType, roomCount, guestCount,
      cost, facilities, author, commentCount, coordinates,
    ].join('\t');
  }
}
