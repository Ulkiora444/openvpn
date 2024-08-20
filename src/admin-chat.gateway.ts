import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200','*'],
  },
})
export class AdminChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server;

  admins = {}
  users  = {}

  private logger: Logger = new Logger('AppGateway');

  constructor(
    private jwtService: JwtService
  ){}

  @SubscribeMessage('msgToServer')
  async handleEvent(@MessageBody('idMy') idMy: string, @MessageBody('idUser') idUser: string, @MessageBody('message') message: string) {
    if(idMy in this.admins){
      this.users[idUser].emit('recMessage', {message: message})
    }
    if(idMy in this.users){
      for(let adminKey in this.admins){
        this.admins[adminKey].emit('recMessage', {message: message, id: idMy})
      }
    }
  }
  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    try{
      const tok = String(client.handshake.headers.token)==''?{role: 'user'}:this.jwtService.verify(String(client.handshake.headers.token));
      if(tok.role == 'admin'){
        delete this.admins[client.id];
      }
      else{
        delete this.users[client.id];
        for(let adminKey in this.admins){
          let keys = [];
          for(let i in this.users){
            keys.push(i)
          }
          this.admins[adminKey].emit('getUsersAdmin', {users: keys})
        }
      }
      this.logger.log(`Client disconnected: ${client.id}`);
    }
    catch(e){
      this.logger.log('error')
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    try{
      const tok = String(client.handshake.headers.token)==''?{role: 'user'}:this.jwtService.verify(String(client.handshake.headers.token));
      if(tok.role == 'admin'){
        this.admins[client.id] = client;
      }
      else{
        this.users[client.id] = client;
        for(let adminKey in this.admins){
          let keys = [];
          for(let i in this.users){
            keys.push(i)
          }
          this.admins[adminKey].emit('getUsersAdmin', {users: keys})
        }
      }
      this.logger.log(`Client connected: ${client.id}`);
    }
    catch(e){
      this.logger.log('error')
    }

  }
}