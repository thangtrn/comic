import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({
  timestamps: true,
})
export class Folder {
  @Prop({ type: String, required: true })
  folderName: string;

  @Prop({ type: Types.ObjectId, ref: 'Folder', default: null })
  parentFolder?: Folder | string | Types.ObjectId;

  // @Prop({ type: String })
  // path: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);

// FolderSchema.pre<FolderDocument>('save', async function (next) {
//   if (this.parentFolder) {
//     const parentFolder = (await this.model('Folder')
//       .findById(this.parentFolder)
//       .exec()) as FolderDocument;
//     if (parentFolder) {
//       this.path = `${parentFolder.path}/${this._id}`;
//     } else {
//       this.path = `/${this._id}`;
//     }
//   } else {
//     this.path = `/${this._id}`;
//   }
//   next();
// });
