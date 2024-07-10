import { Component } from '@angular/core';
interface Cell {
  hasShip: boolean;
}
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  rows: number = 10; // 表格的行數
  cols: number = 10; // 表格的列數
  board: any[][] = []; // 棋盤，用來存放遊戲元素或狀態

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    // 初始化棋盤，這裡先示範填入一些基本的遊戲元素
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.cols; j++) {
        // 假設 0 表示空格子，1 表示有船隻，可以根據遊戲邏輯修改
        this.board[i][j] = 0;
      }
    }
    // 假設設置一些船隻的初始位置
    this.board[0][0] = 1;
    this.board[1][1] = 1;
    this.board[2][2] = 1;
    // 可以根據遊戲邏輯和需要進一步填入其他遊戲元素
  }

  cellClicked(row: number, col: number) {
    // 處理格子被點擊的事件，可以在這裡添加具體的邏輯
    console.log(`Cell clicked: (${row}, ${col})`);
    // 可以在這裡更新遊戲狀態，例如標記為被點擊或執行其他動作
  }
}
