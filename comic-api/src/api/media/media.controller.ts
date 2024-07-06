import {
  Get,
  Post,
  Delete,
  Body,
  Controller,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { multerOptions } from '~/api/media/multer.config';
import { MediaService } from './media.service';
import { Types } from 'mongoose';
import { DeleteMediaDto } from './dtos/delete-media.dto';

@ApiTags('Media')
@Controller('/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('/')
  async getAll() {
    return await this.mediaService.getAll();
  }

  @Post('/uploads')
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
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files?.length <= 0) {
      throw new BadRequestException('Not found resource to upload.');
    }
    return await this.mediaService.uploadFiles(files);
  }

  @Delete('/uploads')
  async deleteFiles(@Body() body: DeleteMediaDto) {
    if (!body._ids || body._ids.some((_id) => !Types.ObjectId.isValid(_id))) {
      throw new BadRequestException(`Some type of _ids is invalid.`);
    }
    return await this.mediaService.deleteFiles(body._ids);
  }
}
