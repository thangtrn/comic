import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bullmq';

import { Model } from 'mongoose';
import { Genres } from '~/schemas/genres.schema';

@Processor('genres-queue')
export class GenresProcessor extends WorkerHost {
  constructor(@InjectModel(Genres.name) private genresModel: Model<Genres>) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'crawl-genres': {
        const result = await this.getOrCreateGenres(job.data as string[]);
        return result;
      }
    }
  }

  private async getOrCreateGenres(genreNames: string[]) {
    const existingGenres = await this.genresModel.find({
      name: { $in: genreNames },
    });

    const existingGenreNames = new Set(existingGenres.map((genre) => genre.name));

    const newGenres = genreNames
      .filter((name) => !existingGenreNames.has(name))
      .map((name) => ({ name }));

    const createdGenres = [];

    for (const genre of newGenres) {
      const createdGenre = await this.genresModel.create(genre);
      createdGenres.push(createdGenre);
    }

    return existingGenres.concat(createdGenres).map((genre) => genre);
  }
}
