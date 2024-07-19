import { createAction } from '@ngrx/store';

export const gameStart = createAction('[Game] Start Menu');
export const playerArrange = createAction('[Game] Player Arramge');
export const playerAttack = createAction('[Game] Player Attack');
export const waitPlayerArrange = createAction('[Game] Wait Player Arrange');
export const waitPlayerAttack = createAction('[Game] Wait Player Attack');
export const gameWin = createAction('[Game] Game Win');
export const gameLose = createAction('[Game] Game Lose');

