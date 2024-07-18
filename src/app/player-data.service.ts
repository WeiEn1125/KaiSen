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
  constructor(private consoleService: ConsoleService) { }

  setPlayer1Data(data: PlayerData) {
    this.player1Data = data;
  }
  setPlayer2Data(data: PlayerData) {
    this.player2Data = data;
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
