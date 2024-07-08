import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Folder } from './folder.schema';

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
  mimeType: string;

  @Prop({ type: String, required: true })
  destination: string;

  @Prop({ type: Number, required: true })
  size: number;

  @Prop({ type: Types.ObjectId, ref: 'Folder', default: null })
  parentFolder?: Folder | string | Types.ObjectId;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
