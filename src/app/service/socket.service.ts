import { ApplicationRef, inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first, Observable } from 'rxjs';
import { PlayerData } from '../models/player/player.model';
import { GameStateService } from './game-state.service';
import { ConsoleService } from './console.service';
import { GameStateEnum } from '../models/game-state/game-state.enum';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket, private AppRef: ApplicationRef, private gameStateService: GameStateService, private consoleService: ConsoleService) {
    this.socket.on('connect', () => {
      this.gameStateService.waitPlayerArrange();
      this.consoleService.log('[Socket] Successfully connected to the server');
    });
    this.socket.on('connect_error', (error: any) => {
      this.disConnect();
      this.consoleService.error('[Socket] Connection error:', error);
      alert('Failed to connect to the server. Please try again later.');
    });

    this.socket.on('disconnect', (reason: any) => {
      this.consoleService.warn('[Socket] Disconnected:', reason);
    });
  }

  connect() {
    this.AppRef.isStable.pipe(
      first((isStable) => isStable))
      .subscribe(() => {
        this.socket.connect();
      });
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

  getUserLeave(): Observable<boolean> {
    return this.socket.fromEvent<boolean>('userLeave');
  }

  getEnemyData(): Observable<{ enemyData: PlayerData, shouldChange: boolean }> {
    return this.socket.fromEvent<{ enemyData: PlayerData, shouldChange: boolean }>('enemyData');
  }

  sendPlayerData(playerData: PlayerData) {
    this.socket.emit('playerData', playerData);
  }

  sendEnemyData(enemyData: PlayerData, shouldChange: boolean) {
    this.socket.emit('enemyData', { enemyData, shouldChange });
  }

  disConnect() {
    this.socket.disconnect();
  }

}
