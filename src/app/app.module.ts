import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { GameComponent } from './components/game/game.component';
import { gameReducer } from './store/game-state/game.reducer';
import { BoardComponent } from './components/board/board.component';
import { ShipComponent } from './components/ship/ship.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';

const config: SocketIoConfig = {
  url: 'https://kaisen-server.onrender.com',
  options: {
    autoConnect: false
  }
};

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    ShipComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      gameState: gameReducer
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }