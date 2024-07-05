import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({
  timestamps: true,
})
export class Folder {}

export const FolderSchema = SchemaFactory.createForClass(Folder);
