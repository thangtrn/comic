import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import Provider from '~/shared/enums/provider.enum';
import Role from '~/shared/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true, sparse: true })
  email: string;

  @Prop({ type: String, minlength: 6 })
  password: string;

  @Prop({})
  notify: boolean;

  @Prop({ type: Boolean })
  fcmToken: boolean;

  @Prop({ type: Boolean, default: false })
  confirmed: boolean;

  @Prop({
    type: String,
    enum: Provider,
    default: Provider.Local,
  })
  provider: Provider;

  @Prop({ type: String })
  providerId: string;

  @Prop({ type: String, enum: Role, default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
