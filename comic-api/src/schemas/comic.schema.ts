import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Media } from './media.schema';
import { Author } from './author.schema';
import { Genres } from './genres.schema';
import Status from '~/api/comic/enums/status.enum';

export type ComicDocument = HydratedDocument<Comic>;

@Schema({
  timestamps: true,
})
export class Comic {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String] })
  originName?: string[];

  @Prop({ type: String })
  introduce?: string;

  @Prop({ type: Types.ObjectId, ref: 'Media' })
  thumbnail?: Media | Types.ObjectId;

  @Prop({
    type: String,
    slug: 'name',
    unique: true,
    slugPaddingSize: true,
    index: true,
  })
  slug: string;

  @Prop({ type: String, enum: Status, default: Status.OnGoing })
  status: Status;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Genres' }],
    default: [],
  })
  genres: Genres[] | Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Author' }],
    default: [],
  })
  authors: Author[] | Types.ObjectId[];
}

export const ComicSchema = SchemaFactory.createForClass(Comic);
