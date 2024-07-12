import { Component, OnInit } from '@angular/core';
import { Ship } from '../models/ship/ship.model';
import { ShipService } from '../service/ship.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {
  ships: Ship[] | null = null;

  constructor(private shipService: ShipService) { }

  ngOnInit() {
    this.ships = this.shipService.getShips();
  }

  shipClicked(ship: Ship) {
    this.shipService.selectShip(ship);
  }

  rotateShip() {
    if (this.ships) {
      this.ships.forEach(ship => {
        ship.isHorizontal = !ship.isHorizontal;
      });
    }
  }

  getArray(size: number) {
    return new Array(size);
  }
}