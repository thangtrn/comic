import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventEmitterModule } from '@nestjs/event-emitter';
import MongooseSlugUpdater = require('mongoose-slug-updater');

import { AuthModule } from '~/api/auth/auth.module';
import { UserModule } from '~/api/user/user.module';
import { CategoryModule } from '~/api/category/category.module';
import { UploadModule } from '~/api/upload/upload.module';
import { ComicModule } from '~/api/comic/comic.module';
import { AuthorModule } from '~/api/author/author.module';
import { ChapterModule } from '~/api/chapter/chapter.module';
import { CommentModule } from '~/api/comment/comment.module';
import { FollowModule } from '~/api/follow/follow.module';
import { NotificationModule } from '~/api/notification/notification.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'public/uploads',
      serveRoot: '/media',
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CacheModule.register({
      isGlobal: true,
      store: () =>
        redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectionFactory: (connection) => {
        connection.plugin(MongooseSlugUpdater);
        return connection;
      },
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    CategoryModule,
    AuthorModule,
    ComicModule,
    ChapterModule,
    UploadModule,
    CommentModule,
    FollowModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
