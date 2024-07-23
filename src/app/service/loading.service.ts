import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  protected isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  show(): void {
    this.isVisibleSubject.next(true);
  }
  hide(): void {
    this.isVisibleSubject.next(false);
  }
}

