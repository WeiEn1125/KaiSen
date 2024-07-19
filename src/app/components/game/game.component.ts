import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GameStateService } from '../../service/game-state.service';
import { GameStateEnum } from '../../models/game-state/game-state.enum';
import { PlayerData } from '../../models/player/player.model';
import { PlayerDataService } from '../../player-data.service';
import { SocketService } from '../../service/socket.service';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameState$!: Observable<string>;
  currentGameState!: string;
  GameStateEnum = GameStateEnum;
  currentPlayerData!: PlayerData;
  enemyPlayerData!: PlayerData;
  message: string = '';
  messages: string[] = [];
  userCount: number = 0;
  isFirst: boolean = false;
  @ViewChild(BoardComponent) boardComponent !: BoardComponent;

  constructor(private gameStateService: GameStateService, private playerDataService: PlayerDataService, private socketService: SocketService, private ngZone: NgZone, private playerService: PlayerDataService) { }

  ngOnInit() {
    this.gameStateService.init();
    this.gameState$ = this.gameStateService.gameState$;
    this.gameState$.pipe(
      tap(state => {
        this.currentGameState = state;
        switch (state) {
          case GameStateEnum.PLAYER_ATTACK:
            this.currentPlayerData = this.playerDataService.playerData;
            break;
          case GameStateEnum.WAIT_PLAYER_ATTACK:
            this.currentPlayerData = this.playerDataService.playerData;
            break;
        }
      })
    ).subscribe();
    this.socketService.getMessage().subscribe((message: string) => {
      this.ngZone.run(() => {
        this.messages.push(message);
      });
    });

    this.socketService.getConnectionRefused().subscribe((msg: string) => {
      this.ngZone.run(() => {
        this.gameStateService.playerArrange();
        alert(msg);
      });
    });

    this.socketService.getUserCount().subscribe((count: number) => {
      this.ngZone.run(() => {
        if (count == 1)
          this.isFirst = true;
        this.userCount = count;
        if (count == 2) {
          this.socketService.sendPlayerData(this.playerDataService.playerData);
        }
      });
    });

    this.socketService.getPlayerData().subscribe((playerData: PlayerData) => {
      this.ngZone.run(() => {
        this.enemyPlayerData = playerData;
        this.playerService.setEnemyData(playerData);
        if (this.isFirst) {
          this.gameStateService.playerAttack();
        }
        else {
          this.gameStateService.waitPlayerAttack();
        }
      });
    });

    this.socketService.getEnemyData().subscribe(data => {
      this.ngZone.run(() => {
        this.playerService.setPlayerData(data.enemyData);
        this.boardComponent.updateBoard(data.enemyData.board, data.enemyData.remainShips);
        if (data.shouldChange)
          this.gameStateService.playerAttack();
      });
    });

    this.socketService.getUserLeave().subscribe((userLeave: boolean) => {
      this.ngZone.run(() => {
        if (userLeave) {
          this.socketService.disConnect();
          alert('Your enemy leave the room!!');
          this.gameStateService.playerArrange();
        }
      });
    })
  }
  ngOnDestroy() {
    this.socketService.disConnect();
  }

  playerArrange(): void {
    this.gameStateService.playerArrange();
  }

  leaveRoom(): void {
    this.socketService.disConnect();
    this.gameStateService.playerArrange();
  }

  gameEnd(): void {
    this.gameStateService.gameEnd();
  }
}
