import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from '~/api/upload/multer.config';

@ApiTags('Upload')
@Controller('/uploads')
export class UploadController {
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', undefined, multerOptions))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('🚀 ~ UploadController ~ uploadFile ~ files:', files);
    return files;
  }
}
