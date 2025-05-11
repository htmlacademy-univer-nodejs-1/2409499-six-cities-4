import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserServiceInterface } from './user-service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';
import { Component } from '../../types/component.enum.js';
import UserService from './user.service.js';


export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(Component.UserService).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  return userContainer;
}
