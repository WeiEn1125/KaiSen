import { Injectable } from '@angular/core';
import { Ship } from '../models/ship/ship.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  private ships: Ship[] = [
    { color: '#345500', size: 5, isSelected: false, hasPut: false, isHorizontal: true },
    { color: '#145500', size: 4, isSelected: false, hasPut: false, isHorizontal: true },
    { color: '#535500', size: 3, isSelected: false, hasPut: false, isHorizontal: true },
    { color: '#612300', size: 3, isSelected: false, hasPut: false, isHorizontal: true },
    { color: '#142220', size: 2, isSelected: false, hasPut: false, isHorizontal: true },
  ];

  private selectedShipSource = new Subject<Ship>();
  selectedShip$ = this.selectedShipSource.asObservable();

  selectShip(ship: Ship) {
    this.selectedShipSource.next(ship);
  }

  placeShip(ship: Ship) {
    const index = this.ships.findIndex(s => s === ship);
    if (index !== -1) {
      this.ships[index].hasPut = true;
      this.selectedShipSource.next(this.ships[index]);
    }
  }

  getShips() {
    return this.ships;
  }
}
