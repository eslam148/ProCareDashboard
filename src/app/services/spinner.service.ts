import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerVisibility = new BehaviorSubject<boolean>(false);
  public isVisible$ = this.spinnerVisibility.asObservable();

  show(): void {
    this.spinnerVisibility.next(true);
  }

  hide(): void {
    this.spinnerVisibility.next(false);
  }
}