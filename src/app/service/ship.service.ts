import { Injectable } from '@angular/core';
import { Ship } from '../models/ship/ship.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  private ships: Ship[] = [];
  private selectedShip: Ship | null = null;

  private selectedShipSource = new Subject<Ship>();
  selectedShip$ = this.selectedShipSource.asObservable();

  initShips() {
    this.ships = [
      { color: '#708090', size: 5, isSelected: false, hasPut: false, isHorizontal: true },
      { color: '#708090', size: 4, isSelected: false, hasPut: false, isHorizontal: true },
      { color: '#708090', size: 3, isSelected: false, hasPut: false, isHorizontal: true },
      { color: '#708090', size: 2, isSelected: false, hasPut: false, isHorizontal: true },
      { color: '#708090', size: 1, isSelected: false, hasPut: false, isHorizontal: true },
    ];
  }
  selectShip(ship: Ship) {
    if (this.selectedShip) {
      this.selectedShip.isSelected = false;
    }
    ship.isSelected = true;
    this.selectedShip = ship;
    this.selectedShipSource.next(ship);
  }


  placeShip(ship: Ship) {
    const index = this.ships.findIndex(s => s === ship);
    if (index !== -1) {
      this.ships[index].hasPut = true;
    }
  }

  rotateShip() {
    if (this.ships) {
      this.ships.forEach(ship => {
        ship.isHorizontal = !ship.isHorizontal;
      });
    }
  }

  resetShip() {
    if (this.ships) {
      this.ships.forEach(ship => {
        ship.isHorizontal = true;
        ship.isSelected = false;
        ship.hasPut = false;
      });
    }
  }

  getShips() {
    return this.ships;
  }

  checkAllShipsPlaced(): boolean {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].hasPut)
        return false;
    }
    return true
  }
}
