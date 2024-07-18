import { Component } from '@angular/core';
import { GameStateService } from '../../service/game-state.service';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrl: './start-menu.component.scss'
})
export class StartMenuComponent {
  constructor(private gameStateService: GameStateService) { }
  
}
