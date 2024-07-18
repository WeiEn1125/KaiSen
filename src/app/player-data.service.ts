import { Injectable } from '@angular/core';
import { PlayerData } from './models/player/player.model';
import { ConsoleService } from './service/console.service';
import { Cell } from './models/board/board.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  player1Data!: PlayerData;
  player2Data!: PlayerData;
  playerData!: PlayerData;
  enemyData!: PlayerData;
  constructor(private consoleService: ConsoleService) { }

  setPlayerData(data: PlayerData) {
    this.playerData = data;
  }

  setEnemyData(data: PlayerData) {
    this.enemyData = data;
  }
  setPlayer1Data(data: PlayerData) {
    this.player1Data = data;
  }
  setPlayer2Data(data: PlayerData) {
    this.player2Data = data;
  }

  updatePlayerData(board: Cell[][], shipCount: number) {
    this.playerData.board = board;
    this.playerData.remainShips = shipCount;
  }

  updateEnemyData(board: Cell[][], shipCount: number) {
    this.enemyData.board = board;
    this.enemyData.remainShips = shipCount;
  }

  updatePlayer1Data(board: Cell[][], shipCount: number) {
    this.player1Data.board = board;
    this.player1Data.remainShips = shipCount;
  }

  updatePlayer2Data(board: Cell[][], shipCount: number) {
    this.player2Data.board = board;
    this.player2Data.remainShips = shipCount;
  }
}
