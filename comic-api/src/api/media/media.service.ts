import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Media } from '~/schemas/media.schema';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media.name) private mediaModel: Model<Media>) {}

  async getAll() {
    return await this.mediaModel.find();
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    const filesUploader: Media[] = files.map((item: Express.Multer.File) => ({
      originalName: item.originalname,
      fileName: item.filename,
      format: item.filename,
      mimeType: item.filename,
      destination: item.destination,
      size: item.size,
    }));

    const docs = await this.mediaModel.insertMany(filesUploader);

    return docs;
  }

  async deleteFiles(_ids: Array<Types.ObjectId>) {
    const docs: Media[] = await this.mediaModel.find({
      _id: { $in: _ids },
    });

    if (docs.length === 0) {
      return [];
    }

    await this.mediaModel.deleteMany({
      _id: { $in: _ids },
    });

    const unlinkPromises = docs.map((mediaFile) =>
      fs.promises
        .unlink(join(mediaFile.destination, mediaFile.fileName))
        .catch((err) => {
          console.error(`Error deleting file ${mediaFile.fileName}:`, err);
        }),
    );

    await Promise.all(unlinkPromises);

    return docs;
  }
}
