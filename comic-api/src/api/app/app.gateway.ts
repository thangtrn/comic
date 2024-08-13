import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, { cors: { origin: '*' } })
export class AppGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log('🚀 ~ handleConnection ~ client:', client);
  }

  handleDisconnect(client: Socket) {
    console.log('🚀 ~ handleDisconnect ~ client:', client);
  }
}
