import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"
          ><Span style="color:#EC8305" class="me-2">2</Span>BLOKES</a
        >

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

        <form class="d-flex">
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
          </ng-container>

          <ng-template #loggedInTemplate>
            <h1>hola</h1>
          </ng-template>

          <button
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
            class="btnRegister btn me-3"
            type="button"
          >
            Sing Up
          </button>
        </form>
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
    .btnLogin{
      color:white;
      border:1px solid #EC8305;
      font-weight: bold;
    }
    .btnLogin:hover {
    color: #EC8300;
    border:1px solid white;
    font-weight: bold;
    }
    .btnRegister{
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

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    this.appComponent.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      console.log(this.isLoggedIn);
    });
  }
}
