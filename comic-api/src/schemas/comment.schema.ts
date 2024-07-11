import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Comic } from './comic.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  likes: User[] | Types.ObjectId[];

  @Prop({ type: String, ref: 'Comic' })
  comic: Comic | Types.ObjectId;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Comment', default: null })
  parentComment: Comment | Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
