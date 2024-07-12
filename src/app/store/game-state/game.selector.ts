import { createSelector} from '@ngrx/store';
import { GameState } from '../../models/game-state/game-state.model';
import { AppState } from '../../app.state';

export const selectGame = (state: AppState) => state.gameState;
export const selectGameStatus = createSelector(
    selectGame,
    (state: GameState) => state.status
);
