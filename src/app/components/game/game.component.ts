import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { gameEnd, player1Arrange, player1Attack, player2Arrange, player2Attack } from '../../store/game-state/game.action';
import { Observable, Subscription, tap } from 'rxjs';
import { selectGameStatus } from '../../store/game-state/game.selector';
import { GameState } from '../../store/game-state/game.reducer';
import { Ship } from '../../models/ship/ship.model';
import { GameStateEnum } from '../../models/game-state/game-state.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameState$!: Observable<string>;
  constructor(private store: Store<GameState>) { }

  ngOnInit() {
    this.gameState$ = this.store.select(selectGameStatus);
      this.gameState$.pipe(
        tap(state => {
          switch (state) {
            case GameStateEnum.PLAYER1_ARRANGE:
              console.log(123);
              break;
            default:
              break;
          }
        })
      ).subscribe();
  }

  player1Arrange(): void {
    this.store.dispatch(player1Arrange());
  }

  player2Arrange(): void {
    this.store.dispatch(player2Arrange());
  }

  player1Attack(): void {
    this.store.dispatch(player1Attack());
  }

  player2Attack(): void {
    this.store.dispatch(player2Attack());
  }

  gameEnd(): void {
    this.store.dispatch(gameEnd());
  }
 

  
}
