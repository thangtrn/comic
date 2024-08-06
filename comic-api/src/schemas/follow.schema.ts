import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Folder } from './folder.schema';

export type FollowDocument = HydratedDocument<Follow>;

@Schema({
  timestamps: true,
})
export class Follow {
  @Prop({ type: Types.ObjectId, ref: 'Comic', required: true })
  comic: Folder | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Folder | Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  notify: boolean;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
