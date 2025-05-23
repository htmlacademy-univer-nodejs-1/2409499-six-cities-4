import { UserEntity } from './user.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';
import {inject, injectable} from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { RentOfferEntity } from '../rent-offer/rent-offer.entity.js';
import { LoginUserDto } from './dto/login.dto.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
        @inject(Component.Logger) private readonly logger: Logger,
        @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async findFavoriteOffers(userId: string): Promise<DocumentType<RentOfferEntity>[]> {
    const offersFavorite = await this.userModel.findById(userId).select('favorite').exec();
    if (offersFavorite === null) {
      return [];
    }
    return this.userModel.find({_id: {$in: offersFavorite.favoriteOffers}});
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);
    if (!user) {
      return null;
    }
    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }
    return null;
  }
}
