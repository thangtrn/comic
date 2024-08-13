import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import { basename, extname } from 'path';
import { diskStorage, FileFilterCallback } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import ShortUniqueId from 'short-unique-id';

const { randomUUID } = new ShortUniqueId({ length: 10 });

const allowedFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mp3'];

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: 'public/uploads',
    filename: (_: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
      const uniqueSuffix = randomUUID();
      const fileExtName = extname(file.originalname);
      const fileBaseName = basename(file.originalname, fileExtName);
      const fileName = `${fileBaseName.replaceAll(' ', '_')}-${uniqueSuffix}${fileExtName}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (_: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const ext = extname(file.originalname).toLowerCase();
    if (allowedFileExtensions.includes(ext)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('Only jpg, jpeg, png, gif, mp4, mp3 files are allowed'));
    }
  },
};
