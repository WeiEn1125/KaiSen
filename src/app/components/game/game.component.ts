import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GameStateService } from '../../service/game-state.service';
import { GameStateEnum } from '../../models/game-state/game-state.enum';
import { PlayerData } from '../../models/player/player.model';
import { PlayerDataService } from '../../player-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameState$!: Observable<string>;
  currentGameState!: string;
  GameStateEnum = GameStateEnum;
  currentPlayerData!: PlayerData;
  enemyPlayerData!: PlayerData;
  constructor(private gameStateService: GameStateService, private playerDataService: PlayerDataService) { }

  ngOnInit() {
    this.gameStateService.init();
    this.gameState$ = this.gameStateService.gameState$;
    this.gameState$.pipe(
      tap(state => {
        this.currentGameState = state;
        switch (state) {
          case GameStateEnum.PLAYER1_ATTACK:
            this.currentPlayerData = this.playerDataService.player1Data;
            this.enemyPlayerData = this.playerDataService.player2Data;
            break;
          case GameStateEnum.PLAYER2_ATTACK:
            this.currentPlayerData = this.playerDataService.player2Data;
            this.enemyPlayerData = this.playerDataService.player1Data;
            break;
        }
      })
    ).subscribe();
  }

  player1Arrange(): void {
    this.gameStateService.player1Arrange();
  }

  player2Arrange(): void {
    this.gameStateService.player2Arrange();
  }

  player1Attack(): void {
    this.gameStateService.player1Attack();
  }

  player2Attack(): void {
    this.gameStateService.player2Attack();
  }

  gameEnd(): void {
    this.gameStateService.gameEnd();
  }
}
