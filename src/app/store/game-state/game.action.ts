import { createAction } from '@ngrx/store';

export const gameStart = createAction('[Game] Start Menu');
export const player1Arrange = createAction('[Game] Player1 Arrange');
export const player2Arrange = createAction('[Game] Player2 Arrange')
export const player1Attack = createAction('[Game] Player1 Attack');
export const player2Attack = createAction('[Game] Player2 Attack');
export const gameEnd = createAction('[Game] End Menu');

