import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;

@Schema({
  timestamps: true,
})
export class Media {
  @Prop({ type: String, required: true })
  originalName: string;

  @Prop({ type: String, required: true })
  fileName: string;

  @Prop({ type: String, required: true })
  format: string;

  @Prop({ type: String, required: true })
  mimeType: string;

  @Prop({ type: String, required: true })
  destination: string;

  @Prop({ type: Number, required: true })
  size: number;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
