import {DocumentType} from '@typegoose/typegoose';
import CreateRentOfferDto from './dto/create-rent-offer.dto.js';
import { RentOfferEntity } from './rent-offer.entity.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

export interface RentOfferServiceInterface {
    create(dto: CreateRentOfferDto): Promise<DocumentType<RentOfferEntity>>;
    findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
    find(): Promise<DocumentType<RentOfferEntity>[]>;
    deleteById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
    updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<RentOfferEntity> | null>;
    getDetailsInfo(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
    incCommentCount(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
    getPremium(): Promise<DocumentType<RentOfferEntity>[]>;
    calculateRating(rating: number, newRating: number, countRating:number, offerId:string): Promise<void>;
    exists(documentId: string): Promise<boolean>;
}
