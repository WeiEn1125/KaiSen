import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { playerArrange, waitPlayerArrange, waitPlayerAttack, playerAttack, gameStart, gameWin, gameLose } from '../store/game-state/game.action';
import { selectGameStatus } from '../store/game-state/game.selector';
import { AppState } from '../app.state';
import { GameStateEnum } from '../models/game-state/game-state.enum';
import { ConsoleService } from './console.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  gameState$!: Observable<string>;
  GameStateEnum = GameStateEnum;
  constructor(private store: Store<AppState>, private consoleService: ConsoleService) { }

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

  gameWin(): void {
    this.store.dispatch(gameWin());
  }

  gameLose(): void {
    this.store.dispatch(gameLose());
  }

  gameStart(): void {
    this.store.dispatch(gameStart());
  }
}
