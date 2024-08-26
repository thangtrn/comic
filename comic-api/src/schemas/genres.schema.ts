import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenresDocument = HydratedDocument<Genres>;

@Schema({
  timestamps: true,
})
export class Genres {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    slug: 'name',
    unique: true,
    slugPaddingSize: true,
    index: true,
  })
  slug: string;
}

export const GenresSchema = SchemaFactory.createForClass(Genres);
