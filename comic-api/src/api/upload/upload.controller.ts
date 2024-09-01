import {
  Get,
  Post,
  Delete,
  Body,
  Controller,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { Secured } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';
import JwtAuthGuard from '~/api/auth/guards/jwt.guard';

import { multerOptions } from '~/api/upload/multer.config';
import { UploadService } from './upload.service';
import { DeleteMediaDto } from './dtos/delete-media.dto';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { UpdateFolderDto } from './dtos/update-folder.dto';
import { DeleteFolderDto } from './dtos/delete-folder.dto';
import { CreateFileDto } from './dtos/create-file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import { QueryAssetsDto } from './dtos/query-assets.dto';

@ApiTags('Upload')
@Controller('/upload')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Secured(Role.Admin)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('/assets')
  async getFilesAndFoldersByParentFolder(@Query() assetsQuery: QueryAssetsDto) {
    return await this.uploadService.getFilesAndFolders(assetsQuery);
  }

  // file handdler
  @Post('/files')
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
          example: ['string'],
        },
        parentFolder: {
          type: 'string',
          example: 'string',
          nullable: true,
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', undefined, multerOptions))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() fileDto: CreateFileDto,
  ) {
    if (!files || files?.length <= 0) {
      throw new BadRequestException('Not found resource to upload.');
    }
    return await this.uploadService.uploadFiles(files, fileDto);
  }

  @Put('/files')
  async updateFiles(@Body() files: UpdateFileDto) {
    return await this.uploadService.updateFiles(files);
  }

  @Delete('/files')
  async deleteFiles(@Body() body: DeleteMediaDto) {
    return await this.uploadService.deleteFiles(body._ids);
  }

  // folder handdler
  @Post('/folders')
  async createFolder(@Body() folder: CreateFolderDto) {
    return await this.uploadService.createFolder(folder);
  }

  @Put('/folders')
  async updateFolder(@Body() folder: UpdateFolderDto) {
    return await this.uploadService.updateFolder(folder);
  }

  @Delete('/folders')
  async deleteFolders(@Body() body: DeleteFolderDto) {
    return await this.uploadService.deletedFolders(body?._ids);
  }
}
