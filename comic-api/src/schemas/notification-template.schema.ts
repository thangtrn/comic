import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import NotifyType from '~/shared/enums/notification.enum';

export type NotificationTemplateDocument = HydratedDocument<NotificationTemplate>;

@Schema({
  timestamps: true,
})
export class NotificationTemplate {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, enum: NotifyType, required: true })
  type: NotifyType;
}

export const NotificationTemplateSchema = SchemaFactory.createForClass(NotificationTemplate);
