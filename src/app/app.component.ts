import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { SocketService } from './service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  message: string = '';
  messages: string[] = [];
  userCount: number = 0;
  alertMsg: string = '';

  constructor(private socketService: SocketService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
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

    // 訂閱用戶數量
    this.socketService.getConnectionRefused().subscribe((alert: string) => {
      this.ngZone.run(() => {
        this.alertMsg = alert;
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
