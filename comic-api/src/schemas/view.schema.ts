import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Comic } from './comic.schema';

export type ViewDocument = HydratedDocument<View>;

@Schema({
  timestamps: true,
})
export class View {
  @Prop({ type: Types.ObjectId, ref: 'Comic', required: true })
  comic: Comic | Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  count: number;
}

export const ViewSchema = SchemaFactory.createForClass(View);
