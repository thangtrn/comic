import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Media, MediaSchema } from '~/schemas/media.schema';
import { Folder, FolderSchema } from '~/schemas/folder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Media.name, schema: MediaSchema },
      { name: Folder.name, schema: FolderSchema },
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [MongooseModule],
})
export class UploadModule {}
