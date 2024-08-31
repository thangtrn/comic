import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CrawlService } from './crawl.service';
import { CrawlComicDto, CrawlGenresDto } from './dtos/crawl.dto';
import JwtAuthGuard from '../auth/guards/jwt.guard';
import { Secured } from '~/shared/decorators/roles';
import Role from '~/shared/enums/role.enum';

@ApiTags('Crawl')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
// @Secured(Role.Admin)
@Controller('crawl')
export class CrawlController {
  constructor(private crawlService: CrawlService) {}

  @Post('/genres')
  async crawlGenres(@Body() crawlGenresDto: CrawlGenresDto) {
    return await this.crawlService.crawlGenres(crawlGenresDto);
  }

  @Post('/comic')
  async crawlComic(@Body() crawlComicDto: CrawlComicDto) {
    return await this.crawlService.crawlComic(crawlComicDto);
  }

  @Get('/reset')
  async reset() {
    return await this.crawlService.reset();
  }
}
