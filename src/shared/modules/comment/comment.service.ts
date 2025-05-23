import {DocumentType, types} from '@typegoose/typegoose';
import { injectable, inject } from 'inversify';
import { CommentEntity } from './comment.entity.js';
import { Component } from '../../types/component.enum.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentServiceInterface } from './comments-service.interface.js';

@injectable()
export class CommentService implements CommentServiceInterface {
  constructor(
        @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId});
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();
    return result.deletedCount;
  }
}
