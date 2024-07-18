import { Cell } from "../board/board.model";

export interface PlayerData {
    board: Cell[][];
    remainShips: number;
}