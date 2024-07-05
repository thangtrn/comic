import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import State from '~/shared/enums/state.enum';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: true,
})
export class Category {
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
}

export const CategorySchema = SchemaFactory.createForClass(Category);
