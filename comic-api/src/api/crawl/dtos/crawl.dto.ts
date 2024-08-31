import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrawlGenresDto {
  @IsString()
  @IsOptional()
  url?: string = 'https://truyenqqto.com/';

  @IsString()
  @IsOptional()
  querySelector?: string = '#header_left_menu li:nth-child(2) .book_tags_content a';
}

export class CrawlComicDto {
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({
    default: [
      'https://truyenqqto.com/truyen-tranh/doraemon-nobita-va-nhung-hiep-si-khong-gian-1062',
    ],
  })
  urls: string[];

  @IsString()
  @IsOptional()
  name: string = '.book_other > h1';

  @IsString()
  @IsOptional()
  originName?: string = '.book_other > h1';

  @IsString()
  @IsOptional()
  introduce?: string = '.story-detail-info';

  @IsString()
  @IsOptional()
  status?: string = '.status p:nth-child(2)';

  @IsString()
  @IsOptional()
  thumbnail?: string = '.book_avatar img';

  @IsString()
  @IsOptional()
  authors?: string = '.author p:nth-child(2) a';

  @IsString()
  @IsOptional()
  genres?: string = '.list01 li a';

  @IsString()
  @IsOptional()
  chapters?: string = '.list_chapter .works-chapter-item a';

  @IsString()
  @IsOptional()
  chapterImages?: string = '.page-chapter img';
}
