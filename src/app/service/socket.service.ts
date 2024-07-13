import { ApplicationRef, inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
    inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable))
      .subscribe(() => { this.socket.connect() });
  }
 
  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent<string>('message');
  }

  getUserCount(): Observable<number> {
    return this.socket.fromEvent<number>('userCount');
  }

  getConnectionRefused(): Observable<string> {
    return this.socket.fromEvent<string>('connectionRefused');
  }

  disConnect(){
    this.socket.disconnect();
  }


}
