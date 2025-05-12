import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { Component } from '../../types/component.enum.js';
import { CommentService } from './comment.service.js';
import { CommentServiceInterface } from './comments-service.interface.js';
import CommentController from './controller/comment.controller.js';


export function createCommentContainer() {
  const commentContainer = new Container();
  commentContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<CommentController>(Component.CommentController).to(CommentController).inSingletonScope();
  return commentContainer;
}
