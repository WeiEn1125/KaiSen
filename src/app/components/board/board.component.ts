import { Component, EventEmitter, Output } from '@angular/core';
import { ConsoleService } from '../../service/console.service';
import { Ship } from '../../models/ship/ship.model';
import { ShipService } from '../../service/ship.service';
import { Cell } from '../../models/board/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  rows: number = 10; // 表格的行數
  cols: number = 10; // 表格的列數
  board: Cell[][] = []; // 棋盤，用來存放遊戲元素或狀態
  selectedShip: Ship | null = null;
  constructor(private consoleService: ConsoleService, private shipService: ShipService) {
  }

  ngOnInit() {
    this.initializeBoard();
    this.shipService.selectedShip$.subscribe(ship => {
      this.selectedShip = ship;
    });
  }

  private initializeBoard() {
    // 初始化棋盤，這裡先示範填入一些基本的遊戲元素
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j] = { hasShip: false, color: '#add8e6' };
      }
    }
    // 假設設置一些船隻的初始位置
    // 可以根據遊戲邏輯和需要進一步填入其他遊戲元素
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
          if (i % 2 == 0) {
            this.updateBoardCell(row, col + (i / 2), isEnter, this.selectedShip.color);
          } else {
            this.updateBoardCell(row, col - Math.ceil(i / 2), isEnter, this.selectedShip.color);
          }
        } else {
          if (i % 2 == 0) {
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
          if (i % 2 == 0) {
            this.updateBoardCellOnPlace(row, col + (i / 2));
          } else {
            this.updateBoardCellOnPlace(row, col - Math.ceil(i / 2));
          }
        } else {
          if (i % 2 == 0) {
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
        if (i % 2 == 0) {
          if (this.board[row][col + (i / 2)] == null || this.board[row][col + (i / 2)].hasShip)
            return false;
        }
        else {
          if (this.board[row][col - Math.ceil(i / 2)] == null || this.board[row][col - Math.ceil(i / 2)].hasShip)
            return false
        }
      }
      else {
        if (i % 2 == 0) {
          if (this.board[row + (i / 2)] == null || this.board[row + (i / 2)][col].hasShip)
            return false;
        }
        else
          if (this.board[row - Math.ceil(i / 2)] == null || this.board[row - Math.ceil(i / 2)][col].hasShip)
            return false;
      }
    }
    return true;
  }

  resetBoard() {
    this.shipService.resetShip();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j].hasShip = false;
        this.board[i][j].color = '#add8e6';
      }
    }
  }
}
