import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import State from '~/shared/enums/state.enum';
import { Comic } from './comic.schema';
import { Media } from './media.schema';

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema({
  timestamps: true,
})
export class Chapter {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, enum: State, default: State.Draft })
  state: State;

  @Prop({
    type: String,
    slug: 'name',
    unique: true,
    slugPaddingSize: true,
    index: true,
  })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: 'Comic' })
  comic: Comic | Types.ObjectId;

  @Prop({ type: String })
  content?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Media' })
  images: Media[] | Types.ObjectId[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);