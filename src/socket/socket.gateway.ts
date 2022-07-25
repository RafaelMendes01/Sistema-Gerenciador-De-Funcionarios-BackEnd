import { Injectable } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(
  3001,

  {
    cors: {
      origin: '*',
    },
  },
)
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.on('connect', (socket: Socket) => {
      console.log('connected: ', socket.id);
    });

    server.on('disconnect', (socket: Socket) => {
      console.log('socket disconnected: ', socket.id);
    });
  }

  emitupdateUser(email: string) {
    this.server.emit('update',email);
    console.log('update back');
  }
  emitRemoveUser(email: string) {
    this.server.emit('removed-user',email);
  }
  emitnewUser(email: string) {
    this.server.emit('new-user', email);
    console.log(`criado ${email}`);
  }

  emitUserLogged() {
    this.server.emit('is-logged');
    console.log('user logado');
  }
}