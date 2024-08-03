import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Folder } from './folder.schema';
import NotifyType from '~/shared/enums/notification.enum';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Folder | Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isReaded: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: String, enum: NotifyType, required: true })
  type: NotifyType;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
