import { Constructor } from './../../../../node_modules/@angular/cdk/schematics/update-tool/migration.d';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../../core/services/logins/login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="btnLogin btn btn-success mx-3"
      (click)="profileSubmit()"
    >
      Profile
    </button>
  `,
  styles: ``,
})
export class ProfileComponent {
  isLoggedIn = false;
  constructor(private profileService: LoginService) {}
  profileSubmit() {
    console.log('entro');
    
    this.profileService.profile().subscribe({
      next(response) {
        console.log(response);
      },
      error(error) {
        console.log(error);
      },
    });
  }
}
