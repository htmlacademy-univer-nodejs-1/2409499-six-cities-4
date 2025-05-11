import { Container } from 'inversify';
import {types} from '@typegoose/typegoose';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { RentOfferEntity, RentOfferModel } from './rent-offer.entity.js';
import { Component } from '../../types/component.enum.js';
import RentOfferService from './rent-offer.service.js';
import OfferController from './controller/rent-offer.controller.js';
import { BaseController } from '../../controller/base-controller.js';


export function createRentOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<RentOfferServiceInterface>(Component.RentOfferService).to(RentOfferService);
  offerContainer.bind<types.ModelType<RentOfferEntity>>(Component.RentOfferModel).toConstantValue(RentOfferModel);
  offerContainer.bind<BaseController>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
