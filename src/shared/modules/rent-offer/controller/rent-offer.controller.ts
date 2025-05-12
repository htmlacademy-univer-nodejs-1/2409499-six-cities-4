import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { HttpMethod } from '../../../types/http-methods.enum.js';
import { fillDTO } from '../../../helpers/common.js';
import UpdateOfferDto from '../dto/update-offer.dto.js';
import { ParamOfferId } from '../../../types/offer-param-id.js';
import { Logger } from '../../../libs/logger/index.js';
import { Component } from '../../../types/component.enum.js';
import { RentOfferServiceInterface } from '../rent-offer-service.interface.js';
import { BaseController } from '../../../controller/base-controller.js';
import { OfferRdo } from '../rdo/rent-offer.rdo.js';
import CreateRentOfferDto from '../dto/create-rent-offer.dto.js';
import { HttpError } from '../../../errors/http-error.js';
import { CommentService } from '../../comment/comment.service.js';
import { ValidateDtoMiddleware } from '../../../middleware/validate.middleware.js';
import { ValidateObjectIdMiddleware } from '../../../middleware/validate-object-id.middleware.js';
import { CommentRdo } from '../../comment/rdo/comment.rdo.js';
import { ExistingDocumentMiddleware } from '../../../middleware/document-exists.middleware.js';


@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.RentOfferService) private readonly offersService: RentOfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ExistingDocumentMiddleware(this.offersService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ExistingDocumentMiddleware(this.offersService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new ExistingDocumentMiddleware(this.offersService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offersService.find();
    const offersToRes = fillDTO(OfferRdo, offers);
    this.ok(res, offersToRes);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentOfferDto>,
    res: Response): Promise<void> {
    const result = await this.offersService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offersService.deleteById(offerId);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offersService.updateById(params.offerId, body);
    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void>{
    const { offerId } = params;
    const offer = await this.offersService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offersService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
