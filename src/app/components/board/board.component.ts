import { Component, Input } from '@angular/core';
import { ConsoleService } from '../../service/console.service';
import { Ship } from '../../models/ship/ship.model';
import { ShipService } from '../../service/ship.service';
import { Cell } from '../../models/board/board.model';
import { GameStateEnum } from '../../models/game-state/game-state.enum';
import { GameStateService } from '../../service/game-state.service';
import { PlayerDataService } from '../../player-data.service';
import { PlayerData } from '../../models/player/player.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() currentGameState: string = '';
  rows: number = 10; // 表格的行数
  cols: number = 10; // 表格的列数
  board: Cell[][] = []; // 棋盘，用来存放游戏元素或状态
  selectedShip: Ship | null = null;
  GameStateEnum = GameStateEnum;

  constructor(private consoleService: ConsoleService,
    private shipService: ShipService,
    private playerDataService: PlayerDataService,
    private gameStateService: GameStateService) {
  }

  ngOnInit() {
    this.initializeBoard();
    this.shipService.selectedShip$.subscribe(ship => {
      this.selectedShip = ship;
    });
  }

  private initializeBoard() {
    // 初始化棋盘
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j] = { hasShip: false, color: '#add8e6', isAttacked: false };
      }
    }
    // 可以根据游戏逻辑进一步填充其他游戏元素
  }

  cellClicked(row: number, col: number) {
    this.consoleService.log(`Cell clicked: (${row}, ${col})`);
    if (this.selectedShip) {
      this.placeSelectedShip(row, col);
    }
  }

  drawGrid(row: number, col: number, isEnter: boolean) {
    if (this.selectedShip) {
      for (let i = 0; i < this.selectedShip.size; i++) {
        if (this.selectedShip.isHorizontal) {
          if (i % 2 === 0) {
            this.updateBoardCell(row, col + (i / 2), isEnter, this.selectedShip.color);
          } else {
            this.updateBoardCell(row, col - Math.ceil(i / 2), isEnter, this.selectedShip.color);
          }
        } else {
          if (i % 2 === 0) {
            this.updateBoardCell(row + (i / 2), col, isEnter, this.selectedShip.color);
          } else {
            this.updateBoardCell(row - Math.ceil(i / 2), col, isEnter, this.selectedShip.color);
          }
        }
      }
    }
  }

  updateBoardCell(row: number, col: number, isEnter: boolean, color: string) {
    if (this.board[row] && this.board[row][col] && !this.board[row][col].hasShip) {
      this.board[row][col].color = isEnter ? color : '#add8e6';
    }
  }

  placeSelectedShip(row: number, col: number) {
    if (this.selectedShip && this.canPlaceShip(row, col)) {
      for (let i = 0; i < this.selectedShip.size; i++) {
        if (this.selectedShip.isHorizontal) {
          if (i % 2 === 0) {
            this.updateBoardCellOnPlace(row, col + (i / 2));
          } else {
            this.updateBoardCellOnPlace(row, col - Math.ceil(i / 2));
          }
        } else {
          if (i % 2 === 0) {
            this.updateBoardCellOnPlace(row + (i / 2), col);
          } else {
            this.updateBoardCellOnPlace(row - Math.ceil(i / 2), col);
          }
        }
      }
      this.shipService.placeShip(this.selectedShip);
      this.selectedShip = null;
    }
  }

  updateBoardCellOnPlace(row: number, col: number) {
    if (this.board[row] && this.board[row][col]) {
      this.board[row][col].hasShip = true;
      this.board[row][col].color = this.selectedShip!.color;
    }
  }

  canPlaceShip(row: number, col: number): boolean {
    for (let i = 0; i < this.selectedShip!.size; i++) {
      if (this.selectedShip!.isHorizontal) {
        if (i % 2 === 0) {
          if (this.board[row][col + (i / 2)] == null || this.board[row][col + (i / 2)].hasShip)
            return false;
        } else {
          if (this.board[row][col - Math.ceil(i / 2)] == null || this.board[row][col - Math.ceil(i / 2)].hasShip)
            return false;
        }
      } else {
        if (i % 2 === 0) {
          if (this.board[row + (i / 2)] == null || this.board[row + (i / 2)][col].hasShip)
            return false;
        } else {
          if (this.board[row - Math.ceil(i / 2)] == null || this.board[row - Math.ceil(i / 2)][col].hasShip)
            return false;
        }
      }
    }
    return true;
  }

  resetBoard() {
    this.shipService.resetShip();
    this.selectedShip = null;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j].hasShip = false;
        this.board[i][j].color = '#add8e6';
      }
    }
  }

  confirmShipArrangement() {
    let data: PlayerData = {
      board: this.board
    };
    if (this.currentGameState === this.gameStateService.GameStateEnum.PLAYER1_ARRANGE) {
      this.playerDataService.setPlayer1Data(data);
      this.gameStateService.player2Arrange();
    } else if (this.currentGameState === this.gameStateService.GameStateEnum.PLAYER2_ARRANGE) {
      this.playerDataService.setPlayer2Data(data);
      this.gameStateService.player1Attack();
    }
  }

  checkCanConfirmShipArrangement(): boolean {
    return this.shipService.checkAllShipsPlaced();
  }
}
