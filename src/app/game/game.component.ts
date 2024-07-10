import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { gameEnd, player1Arrange, player1Attack, player2Arrange, player2Attack } from '../store/game-state/game.action';
import { Observable, Subscription } from 'rxjs';
import { selectGameStatus } from '../store/game-state/game.selector';
import { GameState } from '../store/game-state/game.reducer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameStatus!: string;
  private gameStatusSubscription!: Subscription;
  constructor(private store: Store<GameState>) { }

  ngOnInit() {
    this.gameStatusSubscription = this.store.select(selectGameStatus).subscribe(status => {
      this.gameStatus = status;
    });
  }

  ngOnDestroy() {
    if (this.gameStatusSubscription) {
      this.gameStatusSubscription.unsubscribe();
    }
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
