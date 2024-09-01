import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CrawlService } from './crawl.service';
import { CrawlComicDto, CrawlGenresDto } from './dtos/crawl.dto';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import { Secured } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';

@ApiTags('Crawl')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Secured(Role.Admin)
@Controller('crawl')
export class CrawlController {
  constructor(private crawlService: CrawlService) {}

  @Post('/genres')
  async crawlGenres(@Body() crawlGenresDto: CrawlGenresDto) {
    await this.crawlService.crawlGenres(crawlGenresDto);
    return 'Added crawl genres to the queue';
  }

  @Post('/comic')
  async crawlComic(@Body() crawlComicDto: CrawlComicDto) {
    this.crawlService.crawlComic(crawlComicDto);
    return 'Added crawl comics to the queue';
  }

  @Get('/reset')
  async reset() {
    return await this.crawlService.reset();
  }
}
