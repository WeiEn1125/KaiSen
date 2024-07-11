import { Component, EventEmitter, Output } from '@angular/core';
import { Ship } from '../models/ship/ship.model';
import { ShipService } from '../service/ship.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrl: './ship.component.scss'
})
export class ShipComponent {


  ships: Ship[] | null = null;
  constructor(private shipService: ShipService) { }

  ngOnInit() {
    this.ships = this.shipService.getShips();
  }

  shipClicked(ship: Ship) {
    this.shipService.selectShip(ship);
  }
}
