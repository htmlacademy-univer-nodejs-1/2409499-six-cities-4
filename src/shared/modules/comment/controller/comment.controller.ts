import {inject, injectable} from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '../../../controller/base-controller.js';
import { HttpError } from '../../../errors/http-error.js';
import { fillDTO } from '../../../helpers/common.js';
import { HttpMethod } from '../../../types/http-methods.enum.js';
import { CommentService } from '../comment.service.js';
import CreateCommentDto from '../dto/create-comment.dto.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../../libs/logger/index.js';
import RentOfferService from '../../rent-offer/rent-offer.service.js';
import { CommentRdo } from '../rdo/comment.rdo.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentService,
    @inject(Component.RentOfferService) private readonly offerService: RentOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response
  ): Promise<void> {


    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
