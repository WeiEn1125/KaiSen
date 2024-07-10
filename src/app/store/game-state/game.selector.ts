import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GameState } from './game.reducer';

export const selectGame = createFeatureSelector<GameState>('gameState');
export const selectGameStatus = createSelector(
    selectGame,
    (state: GameState) => state.status
);
