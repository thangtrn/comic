import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-yet';
import { ServeStaticModule } from '@nestjs/serve-static';

import { CategoryModule } from '~/api/category/category.module';
import { UserModule } from '~/api/user/user.module';
import { MediaModule } from '~/api/media/media.module';

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
        connection.plugin(require('mongoose-slug-updater'));
        return connection;
      },
    }),
    UserModule,
    CategoryModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
