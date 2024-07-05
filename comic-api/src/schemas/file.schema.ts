import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<File>;

@Schema({
  timestamps: true,
})
export class File {}

export const FileSchema = SchemaFactory.createForClass(File);
