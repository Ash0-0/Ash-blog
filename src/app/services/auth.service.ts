import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  login(password: string): boolean {
    // In a real app, implement proper authentication
    if (password === 'admin123') {
      this.isAdminSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    this.isAdminSubject.next(false);
  }
}