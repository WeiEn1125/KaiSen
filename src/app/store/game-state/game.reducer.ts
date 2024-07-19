import { createReducer, on } from '@ngrx/store';
import * as GameActions from './game.action';
import { GameStateEnum } from '../../models/game-state/game-state.enum';
import { GameState } from '../../models/game-state/game-state.model';

export const initialState: GameState = {
  status: GameStateEnum.GAME_START
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.gameStart, state => ({ ...state, status: GameStateEnum.GAME_START })),
  on(GameActions.playerArrange, state => ({ ...state, status: GameStateEnum.PLAYER_ARRANGE })),
  on(GameActions.playerAttack, state => ({ ...state, status: GameStateEnum.PLAYER_ATTACK })),
  on(GameActions.waitPlayerArrange, state => ({ ...state, status: GameStateEnum.WAIT_PLAYER_ARRANGE })),
  on(GameActions.waitPlayerAttack, state => ({ ...state, status: GameStateEnum.WAIT_PLAYER_ATTACK })),
  on(GameActions.gameWin, state => ({ ...state, status: GameStateEnum.GAME_WIN })),
  on(GameActions.gameLose, state => ({ ...state, status: GameStateEnum.GAME_LOSE }))

);



