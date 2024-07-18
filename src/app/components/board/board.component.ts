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
  @Input() playerData!: PlayerData;
  @Input() enemyData!: PlayerData;
  rows: number = 10;
  cols: number = 10;
  board: Cell[][] = [];
  selectedShip: Ship | null = null;
  GameStateEnum = GameStateEnum;
  canPlaceShip: boolean = true;
  isAttacking: boolean = false;
  title: string = '';
  remainShips: number = 0;

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
    if (this.playerData != null) {
      this.title = 'Player';
      this.remainShips = this.playerData.remainShips;
      this.board = this.playerData.board;
    }
    else if (this.enemyData != null) {
      this.title = 'Enemy';
      this.remainShips = this.enemyData.remainShips;
      let enemyBoardData = this.enemyData.board;
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = [];
        for (let j = 0; j < this.cols; j++) {
          this.board[i][j] = { hasShip: enemyBoardData[i][j].hasShip, color: enemyBoardData[i][j].isAttacked ? enemyBoardData[i][j].color : '#ffffff', isAttacked: enemyBoardData[i][j].isAttacked };
        }
      }
    }
    else {
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = [];
        for (let j = 0; j < this.cols; j++) {
          this.board[i][j] = { hasShip: false, color: '#ffffff', isAttacked: false };
        }
      }
    }

  }

  cellClicked(row: number, col: number) {
    this.consoleService.log(`Cell clicked: (${row}, ${col})`);
    if (this.currentGameState == GameStateEnum.PLAYER1_ARRANGE || this.currentGameState == GameStateEnum.PLAYER2_ARRANGE) {
      if (this.selectedShip) {
        this.placeSelectedShip(row, col);
      }
    }
    else {
      this.attack(row, col);
    }
  }

  attack(row: number, col: number) {
    if (!this.board[row][col].isAttacked && this.enemyData != null && !this.isAttacking) {
      this.isAttacking = true;
      this.board[row][col].isAttacked = true;
      this.enemyData.board[row][col].isAttacked = true;
      if (!this.board[row][col].hasShip) {
        this.board[row][col].color = '#0000ff80';
        this.enemyData.board[row][col].color = '#0000ff80';
        if (this.currentGameState == GameStateEnum.PLAYER1_ATTACK) {
          this.playerDataService.updatePlayer2Data(this.enemyData.board, this.enemyData.remainShips);
          setTimeout(() => {
            this.gameStateService.player2Attack();
          }, 1000);
        }
        else if (this.currentGameState == GameStateEnum.PLAYER2_ATTACK) {
          this.playerDataService.updatePlayer1Data(this.enemyData.board, this.enemyData.remainShips);
          setTimeout(() => {
            this.gameStateService.player1Attack();
          }, 1000);
        }
      }
      else {
        this.board[row][col].color = '#ff000080';
        this.enemyData.board[row][col].color = '#ff000080';
        this.enemyData.remainShips--;
        this.remainShips--;
        setTimeout(() => {
          this.isAttacking = false;
        }, 1000);
      }
    }
  }

  drawGrid(row: number, col: number, isEnter: boolean) {
    if (this.selectedShip) {
      if (this.checkCanPlaceShip(row, col)) {
        this.canPlaceShip = true;
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
      else {
        this.canPlaceShip = false;
        for (let i = 0; i < this.selectedShip.size; i++) {
          if (this.selectedShip.isHorizontal) {
            if (i % 2 === 0) {
              this.updateBoardCell(row, col + (i / 2), isEnter, '#f08080');
            } else {
              this.updateBoardCell(row, col - Math.ceil(i / 2), isEnter, '#f08080');
            }
          } else {
            if (i % 2 === 0) {
              this.updateBoardCell(row + (i / 2), col, isEnter, '#f08080');
            } else {
              this.updateBoardCell(row - Math.ceil(i / 2), col, isEnter, '#f08080');
            }
          }
        }
      }
    }

  }

  updateBoardCell(row: number, col: number, isEnter: boolean, color: string) {
    if (this.board[row] && this.board[row][col] && !this.board[row][col].hasShip) {
      this.board[row][col].color = isEnter ? color : '#ffffff';
    }
  }

  placeSelectedShip(row: number, col: number) {
    if (this.selectedShip && this.canPlaceShip) {
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

  checkCanPlaceShip(row: number, col: number): boolean {
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
        this.board[i][j].color = '#ffffff';
      }
    }
  }

  confirmShipArrangement() {
    let data: PlayerData = {
      board: this.board,
      remainShips: 15
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
