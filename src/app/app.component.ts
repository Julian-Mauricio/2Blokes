import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '2blokes';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private profileSubject = new BehaviorSubject<any>(null);
  profile$ = this.profileSubject.asObservable();

  constructor() {}
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.isLoggedInSubject.next(false);
  }
  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  updateLoginStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }
  saveProfile(profileData: any) {
    localStorage.setItem('profile', JSON.stringify(profileData));
    this.profileSubject.next(profileData);
  }
}
