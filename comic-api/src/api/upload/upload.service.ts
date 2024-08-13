import * as fs from 'fs';
import { join } from 'path';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Media } from '~/schemas/media.schema';
import { Folder } from '~/schemas/folder.schema';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { CreateFileDto } from './dtos/create-file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import removeNullUndefinedFields from '~/utils/removeNullUndefinedFields';
import { PaginationQueryDto } from '~/shared/dtos/pagination.dto';
import returnMeta from '~/helpers/metadata';
import { QueryAssetsDto } from './dtos/query-assets.dto';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<Media>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
  ) {}

  // file handler
  async getFilesAndFoldersByParentFolderId(query: QueryAssetsDto) {
    const [count, docs] = await Promise.all([
      this.mediaModel.countDocuments({ parentFolder: query.parentFolderId }),
      await this.folderModel.aggregate([
        {
          $match: {
            parentFolder: query.parentFolderId,
          },
        },
        {
          $group: {
            _id: '$parentFolder',
            folders: {
              $push: '$$ROOT',
            },
          },
        },
        {
          $lookup: {
            from: 'media',
            let: {
              parentFolderId: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$parentFolder', '$$parentFolderId'],
                  },
                },
              },
              {
                $skip: query.skip,
              },
              {
                $limit: query.limit,
              },
            ],
            as: 'files',
          },
        },
        {
          $graphLookup: {
            from: 'folders',
            startWith: '$_id',
            connectFromField: 'parentFolder',
            connectToField: '_id',
            as: 'breadcrumb',
            maxDepth: 10,
            depthField: 'level',
          },
        },
        {
          $project: {
            _id: 0,
            parentFolder: '$_id',
            breadcrumb: {
              $reverseArray: '$breadcrumb',
            },
            folders: '$folders',
            files: '$files',
          },
        },
      ]),
    ]);
    return returnMeta(docs, query.page, query.limit, count);
  }

  async uploadFiles(files: Array<Express.Multer.File>, fileDto: CreateFileDto) {
    const filesUploader = files.map((file: Express.Multer.File) => ({
      originalName: file.originalname,
      fileName: file.filename,
      mimeType: file.mimetype,
      destination: file.destination,
      size: file.size,
      parentFolder: fileDto?.parentFolder,
    }));

    const docs = await this.mediaModel.insertMany(filesUploader);

    return docs;
  }

  async updateFiles(files: UpdateFileDto) {
    const docs = await this.mediaModel.updateMany(
      {
        _id: { $in: files._ids },
      },
      {
        $set: {
          parentFolder: files?.parentFolder ? new Types.ObjectId(files.parentFolder) : null,
        },
      },
      {
        new: true,
      },
    );

    return docs;
  }

  async deleteFiles(_ids: string[]) {
    const docs = await this.mediaModel.find({
      _id: { $in: _ids },
    });

    if (docs.length === 0) {
      return [];
    }

    await this.mediaModel.deleteMany({
      _id: { $in: _ids },
    });

    const unlinkPromises = docs.map((mediaFile) =>
      fs.promises.unlink(join(mediaFile.destination, mediaFile.fileName)).catch((err) => {
        console.error(`Error deleting file ${mediaFile.fileName}:`, err);
      }),
    );

    await Promise.all(unlinkPromises);

    return docs;
  }

  // folder handler
  async createFolder(folder: CreateFolderDto) {
    return await this.folderModel.create(folder);
  }

  async updateFolder(folder: UpdateFolderDto) {
    const { _id, ...folderWithoutId } = folder;

    const docs = await this.folderModel.findByIdAndUpdate(
      _id,
      {
        $set: removeNullUndefinedFields(folderWithoutId),
      },
      { new: true },
    );

    if (!docs) {
      throw new NotFoundException('Not found category with _id = ' + _id);
    }

    return docs;
  }

  async deletedFolders(_ids: string[]) {
    const docs = await this.folderModel.deleteMany({ _id: { $in: _ids } });
    return docs;
  }
}
