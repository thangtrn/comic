import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import State from '~/shared/enums/state.enum';
import { Media } from './media.schema';
import Status from '~/shared/enums/status.enum';
import { Author } from './author.schema';
import { Category } from './category.schema';

export type ComicDocument = HydratedDocument<Comic>;

@Schema({
  timestamps: true,
})
export class Comic {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  introduce: string;

  @Prop({ type: Types.ObjectId, ref: 'Media' })
  thumbnail: Media | Types.ObjectId;

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

  @Prop({ type: [Types.ObjectId], ref: 'Category' })
  categories: Category[] | Types.ObjectId[];

  @Prop({ type: Number, enum: State, default: Status.Process })
  status: Status;

  @Prop({ type: [Types.ObjectId], ref: 'Author' })
  authors: Author[] | Types.ObjectId[];
}

export const ComicSchema = SchemaFactory.createForClass(Comic);
