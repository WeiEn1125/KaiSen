import {createReducer, on } from '@ngrx/store';
import * as GameActions from './game.action';
import { GameStateEnum } from '../../models/game-state/game-state.enum';
import { GameState } from '../../models/game-state/game-state.model';

export const initialState: GameState = {
    status: GameStateEnum.GAME_START
  };
  
  export const gameReducer = createReducer(
    initialState,
    on(GameActions.player1Arrange, state => ({ ...state, status: GameStateEnum.PLAYER1_ARRANGE })),
    on(GameActions.player2Arrange, state => ({ ...state, status: GameStateEnum.PLAYER2_ARRANGE })),
    on(GameActions.player1Attack, state => ({ ...state, status: GameStateEnum.PLAYER1_ATTACK })),
    on(GameActions.player2Attack, state => ({ ...state, status: GameStateEnum.PLAYER2_ATTACK })),
    on(GameActions.gameEnd, state => ({ ...state, status: GameStateEnum.GAME_END }))
  );

export { GameState };

