import { PartialType } from '@nestjs/swagger';
import { MultipleIdDto } from '~/shared/dtos/base-mongo-id.dto';

export class DeleteFolderDto extends PartialType(MultipleIdDto) {}
