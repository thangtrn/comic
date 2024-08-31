import Status from '~/api/comic/enums/status.enum';

export interface CrawlAuthor {
  name: string;
}

export interface CrawlGenre {
  name: string;
}

export interface CrawlChapter {
  name: string;
  link: string;
}

export interface CrawlComicData {
  name: string;
  originName: string[];
  introduce: string;
  thumbnail: string;
  status: Status;
  authors: CrawlAuthor[];
  genres: CrawlGenre[];
  chapters: CrawlChapter[];
}
