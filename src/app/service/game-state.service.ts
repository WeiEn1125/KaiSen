import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { player1Arrange, player2Arrange, player1Attack, player2Attack, gameEnd, playerArrange, waitPlayerArrange, waitPlayerAttack, playerAttack } from '../store/game-state/game.action';
import { selectGameStatus } from '../store/game-state/game.selector';
import { AppState } from '../app.state';
import { GameStateEnum } from '../models/game-state/game-state.enum';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  gameState$!: Observable<string>;
  GameStateEnum = GameStateEnum;
  constructor(private store: Store<AppState>) { }

  init() {
    this.gameState$ = this.store.select(selectGameStatus);
  }


  playerArrange(): void {
    this.store.dispatch(playerArrange());
  }

  playerAttack(): void {
    this.store.dispatch(playerAttack());
  }

  waitPlayerArrange(): void {
    this.store.dispatch(waitPlayerArrange());
  }

  waitPlayerAttack(): void {
    this.store.dispatch(waitPlayerAttack());
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
