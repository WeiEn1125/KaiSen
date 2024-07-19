import { Component, OnDestroy, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { GameStateService } from '../../service/game-state.service';
import { GameStateEnum } from '../../models/game-state/game-state.enum';
import { PlayerData } from '../../models/player/player.model';
import { PlayerDataService } from '../../player-data.service';
import { SocketService } from '../../service/socket.service';
import { BoardComponent } from '../board/board.component';
import { ConsoleService } from '../../service/console.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  gameState$!: Observable<string>;
  currentGameState!: string;
  GameStateEnum = GameStateEnum;
  currentPlayerData!: PlayerData;
  enemyPlayerData!: PlayerData;
  message: string = '';
  messages: string[] = [];
  userCount: number = 0;
  isFirst: boolean = false;
  isWin: boolean = false;
  @ViewChild(BoardComponent) boardComponent!: BoardComponent;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private gameStateService: GameStateService,
    private playerDataService: PlayerDataService,
    private socketService: SocketService,
    private ngZone: NgZone,
    private consoleService: ConsoleService
  ) { }

  ngOnInit() {
    this.gameStateService.init();
    this.gameState$ = this.gameStateService.gameState$;

    const gameStateSub = this.gameState$.pipe(
      tap(state => {
        this.currentGameState = state;
        this.consoleService.log('[Game State]', state);
        switch (state) {
          case GameStateEnum.PLAYER_ARRANGE:
            this.isFirst = false;
            break;
          case GameStateEnum.PLAYER_ATTACK:
          case GameStateEnum.WAIT_PLAYER_ATTACK:
            this.currentPlayerData = this.playerDataService.playerData;
            break;
          case GameStateEnum.GAME_WIN:
          case GameStateEnum.GAME_LOSE:
            this.socketService.disConnect();
            break;
        }
      })
    ).subscribe();

    this.subscriptions.add(gameStateSub);

    const socketSubs = [
      this.socketService.getMessage().subscribe((message: string) => {
        this.ngZone.run(() => {
          this.messages.push(message);
        });
      }),
      this.socketService.getConnectionRefused().subscribe((msg: string) => {
        this.ngZone.run(() => {
          this.gameStateService.playerArrange();
          alert(msg);
        });
      }),
      this.socketService.getUserCount().subscribe((count: number) => {
        this.ngZone.run(() => {
          if (count === 1) this.isFirst = true;
          this.userCount = count;
          if (count === 2) {
            this.socketService.sendPlayerData(this.playerDataService.playerData);
          }
        });
      }),
      this.socketService.getPlayerData().subscribe((playerData: PlayerData) => {
        this.ngZone.run(() => {
          this.enemyPlayerData = playerData;
          this.playerDataService.setEnemyData(playerData);
          if (this.isFirst) {
            this.gameStateService.playerAttack();
          } else {
            this.gameStateService.waitPlayerAttack();
          }
        });
      }),
      this.socketService.getEnemyData().subscribe(data => {
        this.ngZone.run(() => {
          this.playerDataService.setPlayerData(data.enemyData);
          this.boardComponent.updateBoard(data.enemyData.board, data.enemyData.remainShips);
          if (data.shouldChange) this.gameStateService.playerAttack();
        });
      }),
      this.socketService.getUserLeave().subscribe(() => {
        this.ngZone.run(() => {
          if (this.currentGameState != GameStateEnum.GAME_WIN && this.currentGameState != GameStateEnum.GAME_LOSE) {
            this.socketService.disConnect();
            alert('Your enemy leave the room!!');
            this.gameStateService.playerArrange();
          }
        });
      })
    ];

    socketSubs.forEach(sub => this.subscriptions.add(sub));
  }

  ngOnDestroy() {
    this.socketService.disConnect();
    this.subscriptions.unsubscribe();
  }

  playerArrange(): void {
    this.gameStateService.playerArrange();
  }

  leaveRoom(): void {
    this.socketService.disConnect();
    this.gameStateService.playerArrange();
  }

  restart(): void {
    this.gameStateService.gameStart();
  }
}
