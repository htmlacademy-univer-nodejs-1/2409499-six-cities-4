import { RestApplication } from './rest/index.js';
import { Container } from 'inversify';
import { Component } from './shared/types/component.enum.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createRentOfferContainer } from './shared/modules/rent-offer/rent-offer.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createRentOfferContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
