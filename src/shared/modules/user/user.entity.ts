/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { createSHA256 } from '../../helpers/index.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true })
  public name: string;

  @prop({ required: false, default: '' })
  public avatarPath?: string;

  @prop({ required: true, default: '' })
  public password?: string;

  @prop({ required: true })
  public userType: string;

  @prop({required: true})
  public favoriteOffers: string[];

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
