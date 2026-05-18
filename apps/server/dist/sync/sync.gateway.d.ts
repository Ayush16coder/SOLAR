import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventService } from '../event/event.service';
export declare class SyncGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private eventService;
    server: Server;
    constructor(eventService: EventService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, room: string): {
        event: string;
        data: string;
    };
    handleLeaveRoom(client: Socket, room: string): {
        event: string;
        data: string;
    };
    handleCodeChange(client: Socket, payload: {
        room: string;
        data: any;
    }): Promise<void>;
}
