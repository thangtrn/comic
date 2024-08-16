import { Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { redisNotificationKey } from './services/notification.service';

const NOTIFICATION_TTL = 7 * 24 * 60 * 60 * 1000;

export interface INotificationRedis {
  userId: string;
  socketId: string;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateWay implements OnGatewayDisconnect {
  @WebSocketServer()
  public io: Server;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async handleDisconnect(client: Socket) {
    const notificationKeyPattern = redisNotificationKey('*', client.id);
    const keys = await this.cacheManager.store.keys(notificationKeyPattern);
    if (keys?.[0]) {
      await this.cacheManager.del(keys[0]);
    }
  }

  @SubscribeMessage('register-notification')
  async registerNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody('userId') userId: string,
  ) {
    await this.cacheManager.set(
      redisNotificationKey(userId, client.id),
      {
        userId: userId,
        socketId: client.id,
      },
      NOTIFICATION_TTL,
    );
  }
}
