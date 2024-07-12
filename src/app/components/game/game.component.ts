import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GameStateService } from '../../service/game-state.service';
import { GameStateEnum } from '../../models/game-state/game-state.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameState$!: Observable<string>;
  currentGameState!: string;
  GameStateEnum = GameStateEnum; 
 
  constructor(private gameStateService: GameStateService) { }

  ngOnInit() {
    this.gameStateService.init();
    this.gameState$ = this.gameStateService.gameState$;
    this.gameState$.pipe(
      tap(state => {
        this.currentGameState = state;
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
