import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventService } from '../event/event.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from './guards/ws-jwt.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SyncGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private eventService: EventService) {
    this.eventService.getEvents().subscribe(({ channel, message }) => {
      this.server.to(channel).emit('event', message);
    });
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    this.eventService.subscribe(room);
    return { event: 'joined', data: room };
  }

  @SubscribeMessage('leave')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    return { event: 'left', data: room };
  }

  @SubscribeMessage('code_change')
  async handleCodeChange(client: Socket, payload: { room: string; data: any }) {
    // Broadcast to other clients in the same room via Redis
    await this.eventService.publish(payload.room, {
      type: 'CODE_CHANGED',
      ...payload.data,
      sender: client.id,
    });
  }
}
