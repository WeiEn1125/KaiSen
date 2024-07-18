import { ApplicationRef, inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first, Observable } from 'rxjs';
import { Cell } from '../models/board/board.model';
import { PlayerData } from '../models/player/player.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket, private AppRef: ApplicationRef) {
  }

  connect() {
    this.AppRef.isStable.pipe(
      first((isStable) => isStable))
      .subscribe(() => { this.socket.connect() });
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent<string>('message');
  }

  getUserCount(): Observable<number> {
    return this.socket.fromEvent<number>('userCount');
  }

  getConnectionRefused(): Observable<string> {
    return this.socket.fromEvent<string>('connectionRefused');
  }

  getPlayerData(): Observable<PlayerData> {
    return this.socket.fromEvent<PlayerData>('playerData');
  }

  sendPlayerData(playerData: PlayerData) {
    this.socket.emit('playerData', playerData);
  }

  getEnemyData(): Observable<{ enemyData: PlayerData, shouldChange: boolean }> {
    return this.socket.fromEvent<{ enemyData: PlayerData, shouldChange: boolean }>('enemyData');
  }

  sendEnemyData(enemyData: PlayerData, shouldChange: boolean) {
    this.socket.emit('enemyData', { enemyData, shouldChange });
  }

  disConnect() {
    this.socket.disconnect();
  }

}
