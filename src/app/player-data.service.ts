import { Injectable } from '@angular/core';
import { PlayerData } from './models/player/player.model';
import { ConsoleService } from './service/console.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  player1Data!: PlayerData;
  player2Data!: PlayerData;
  constructor(private consoleService: ConsoleService) { }

  setPlayer1Data(data: PlayerData) {
    this.player1Data = data;
    this.consoleService.log(this.player1Data);
  }
  setPlayer2Data(data: PlayerData) {
    this.player2Data = data;
    this.consoleService.log(this.player2Data);
  }
}
