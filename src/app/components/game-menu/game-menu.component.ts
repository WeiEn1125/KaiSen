import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { SocketService } from '../../service/socket.service';
import { Cell } from '../../models/board/board.model';
import { PlayerDataService } from '../../player-data.service';
import { PlayerData } from '../../models/player/player.model';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.scss'
})
export class GameMenuComponent {
  message: string = '';
  messages: string[] = [];
  userCount: number = 0;
  alertMsg: string = '';
  enemyData!: PlayerData;
  constructor(private socketService: SocketService, private cdr: ChangeDetectorRef, private ngZone: NgZone, private playerService: PlayerDataService) {
  }

  ngOnInit() {
    this.socketService.getMessage().subscribe((message: string) => {
      this.ngZone.run(() => {
        this.messages.push(message);
      });
    });

    // 訂閱用戶數量
    this.socketService.getUserCount().subscribe((count: number) => {
      this.ngZone.run(() => {
        this.userCount = count;
      });
    });

    this.socketService.getConnectionRefused().subscribe((alert: string) => {
      this.ngZone.run(() => {
        this.alertMsg = alert;
      });
    });

    this.socketService.getPlayerData().subscribe((playerData: PlayerData) => {
      this.ngZone.run(() => {
        this.enemyData = playerData;
      });
    });

  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }

  ngOnDestroy() {
    this.socketService.disConnect();
  }
}
