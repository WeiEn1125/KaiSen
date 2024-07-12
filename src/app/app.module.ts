import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { GameComponent } from './components/game/game.component';
import { gameReducer } from './store/game-state/game.reducer';
import { BoardComponent } from './components/board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShipComponent } from './components/ship/ship.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    ShipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('gameState', gameReducer),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
