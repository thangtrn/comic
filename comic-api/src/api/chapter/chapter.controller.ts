import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chapter')
@Controller('chapter')
export class ChapterController {}
