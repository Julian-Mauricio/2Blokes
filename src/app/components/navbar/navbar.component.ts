import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><span style="color:#EC8305" class="me-2">2</span>BLOKES</a>
        
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex ms-auto">
            <ng-container *ngIf="!isLoggedIn; else loggedInTemplate">
              <button
                class="btnLogin btn me-3"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                type="button"
                [disabled]="isLoggedIn"
              >
                Login
              </button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
                class="btnRegister btn me-3"
                type="button"
              >
                Sign Up
              </button>
            </ng-container>
            <ng-template #loggedInTemplate>
              <button
                type="submit"
                class="btn btnLogin me-3"
                (click)="logoutToken()"
              >
                Cerrar sesión
              </button>
              <button
                type="submit"
                class="btn btnRegister me-3"
                (click)="goToProfile()"
              >
                Profile
              </button>
            </ng-template>
          </form>
        </div>
      </div>
    </nav>
  `,
  styles: `
    nav {
      background-color: rgb(33,37,41);
    }
    a {
      color:white;
      font-size:40px;
    }
    .btnLogin {
      color:white;
      border:1px solid #EC8305;
      font-weight: bold;
    }
    .btnLogin:hover {
      color: #EC8300;
      border:1px solid white;
      font-weight: bold;
    }
    .btnRegister {
      color: #EC8300;
      border:1px solid white;
      font-weight: bold;
    }
    .btnRegister:hover {
      color:white;
      border:1px solid #EC8305;
      font-weight: bold;
    }
  `,
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private appComponent: AppComponent, private router: Router) {}

  ngOnInit() {
    this.appComponent.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      console.log(this.isLoggedIn);
    });
  }

  logoutToken() {
    this.appComponent.logout();
    this.router.navigate(['']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
