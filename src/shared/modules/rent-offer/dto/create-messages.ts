export const CreateOfferValidationMessage = {
  author: {
    invalidId: 'userId must be a valid identifier',
  },
  city: {
    invalidFormat: 'City must be a string',
  },
  facilities: {
    invalidFormat: 'Facilities must be a valid string',
  },
  coordinates: {
    invalidFormat: 'Coordinates must be a valid object',
  },
  guestCount: {
    invalidFormat: 'guestCount must be an integer',
    lengthField: 'Minimum value is 1, maximum is 10',
  },
  roomCount: {
    invalidFormat: 'roomCount must be an integer',
    lengthField: 'Minimum value is 1, maximum is 8',
  },
  publicationDate: {
    invalidFormat: 'Publication date must be a valid ISO date',
  },
  summary: {
    minLength: 'Minimum summary length is 20 characters',
    maxLength: 'Maximum summary length is 1024 characters',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  photos: {
    invalidFormat: 'photos must be an array',
  },
  title: {
    minLength: 'Minimum title length is 10 characters',
    maxLength: 'Maximum title length is 100 characters',
  },
  cost: {
    invalidFormat: 'cost must be an integer',
    lengthField: 'Minimum value is 100, maximum is 100000',
  },
  previewPath: {
    invalidFormat: 'previewPath must be a string',
  },
  rating: {
    invalidFormat: 'rating must be a number',
    lengthField: 'Minimum value is 1, maximum is 5',
  },
  offerType: {
    invalidFormat: 'offerType must be a string',
  },
} as const;
