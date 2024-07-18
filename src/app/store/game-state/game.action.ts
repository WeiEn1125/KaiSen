import { createAction } from '@ngrx/store';

export const gameStart = createAction('[Game] Start Menu');
export const playerArrange = createAction('[Game] Player Arramge');
export const playerAttack = createAction('[Game] Player Attack');
export const waitPlayerArrange = createAction('[Game] Wait Player Arrange');
export const waitPlayerAttack = createAction('[Game] Wait Player Attack');

export const player1Arrange = createAction('[Game] Player1 Arrange');
export const player2Arrange = createAction('[Game] Player2 Arrange')
export const player1Attack = createAction('[Game] Player1 Attack');
export const player2Attack = createAction('[Game] Player2 Attack');
export const gameEnd = createAction('[Game] End Menu');

