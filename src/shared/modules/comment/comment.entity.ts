import { defaultClasses, modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { RentOfferEntity } from '../rent-offer/rent-offer.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {
}
@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
    @prop({
      trim: true,
      required: true,
      min: [5, 'Min length for text is 5'],
      max: [1024, 'Min length for text is 1024'],
    })
  public text!: string;

    @prop({
      ref: RentOfferEntity,
      required: true
    })
    public offerId: Ref<RentOfferEntity>;

    @prop({
      ref: UserEntity,
      required: true,
    })
    public userId: Ref<UserEntity>;

    @prop({required: true})
    public datePublication!: Date;

    @prop({required: true})
    public rating!: number;
}
export const CommentModel = getModelForClass(CommentEntity);
