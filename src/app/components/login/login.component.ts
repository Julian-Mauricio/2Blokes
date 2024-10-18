import { LoginService } from './../../core/services/logins/login.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [LoginService],
  template: `
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog custom-modal">
        <div class="formodal modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-custom"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="bi bi-caret-left-fill"></i>
            </button>
            <h1 class="modal-title" id="exampleModalLabel">Log In</h1>
          </div>

          <div class="modal-body">
            <form [formGroup]="loginForm" (ngSubmit)="loginSubmit()">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  formControlName="email"
                  placeholder="2Blokes@gmail.com"
                />
                <div
                  *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                  class="text-danger"
                >
                  El correo es requerido y debe ser válido.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  formControlName="password"
                  placeholder="..........."
                />
                <div
                  *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                  class="text-danger"
                >
                  La contraseña es requerida.
                </div>
              </div>
              <div class="modal-footer d-flex text-center justify-content-center">
                <div *ngIf="loginError" class="text-danger mb-2">
                  {{ loginError }}
                </div>
                <div *ngIf="loginSuccess" class="text-success mb-2">
                  {{ loginSuccess }}
                </div>
                <button
                  type="submit"
                  class="btnLogin btn w-100"
                  [disabled]="loginForm.invalid"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      input:focus {
        border-color: rgb(225, 227, 229);
        box-shadow: 0 0 0 rgb(225, 227, 229);
        color: rgb(225, 227, 229);
        background-color: rgb(15, 15, 15);
      }

      input {
        background-color: rgb(15, 15, 15);
        border: 1px solid transparent;
        color: rgb(225, 227, 229);
      }
      
      .formodal {
        background-color: rgb(26, 26, 26);
      }

      h1 {
        color: rgb(225, 227, 229);
        font-size: 30px;
        font-weight: bold;
      }

      .modal-header {
        border-bottom: none;
      }

      .modal-footer {
        border-top: none;
      }

      .custom-modal {
        max-width: 350px;
        width: 90%;
      }

      label {
        color: rgb(225, 227, 229);
      }

      .btn-custom {
        background-color: transparent;
        color: rgb(220, 61, 32);
        border: none;
        font-size: 24px;
      }

      .btnLogin {
        background-color: rgb(220, 61, 32);
        color: rgb(225, 227, 229);
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  loginSuccess: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private appComponent: AppComponent,
    private elementref: ElementRef,
    private renderer: Renderer2
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.loginService.login(loginData).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.appComponent.updateLoginStatus(true);
          this.loginSuccess = 'Login successful!';
          this.loginError = null; 
          this.loginForm.reset();
          this.modal();
          setTimeout(() => {
            this.loginSuccess = null;
          }, 3000);
        },
        error: (error) => {
          console.error('Error de login', error);
          this.loginError = error.error.message;
          this.loginSuccess = null; 
        },
      });
    }
  }

  modal() {
    const modal = this.elementref.nativeElement.querySelector('#loginModal');
    this.renderer.removeClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'none');
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}
