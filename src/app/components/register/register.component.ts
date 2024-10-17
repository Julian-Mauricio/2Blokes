import { RegisterService } from './../../core/services/registers/register.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterRequest } from '../../interfaces/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [RegisterService],
  template: `
    <div
      class="modal fade"
      id="registerModal"
      tabindex="-1"
      aria-labelledby="registerModalLabel"
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
            <h1 class="modal-title" id="registerModalLabel">Sign Up</h1>
          </div>
          <div class="modal-body">
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="registerInputName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="registerInputName"
                  formControlName="name"
                  required
                  placeholder="2Blokes"
                />
              </div>
              <div class="mb-3">
                <label for="registerInputEmail" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="registerInputEmail"
                  formControlName="email"
                  required
                  placeholder="example@gmail.com"
                />
              </div>
              <div class="mb-3">
                <label for="registerInputPassword" class="form-label"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="registerInputPassword"
                  formControlName="password"
                  required
                  placeholder="..........."
                />
              </div>
              <div class="modal-footer d-flex text-center justify-content-center">
                <div *ngIf="errorMessage" class="text-danger mb-2">
                  {{errorMessage}}
                </div>
                <button
                  type="submit"
                  class="btnRegister btn w-100"
                  [disabled]="registerForm.invalid"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
  input:focus {
    border-color: rgb(225, 227, 229);
    box-shadow: 0 0 0 rgb(225, 227, 229);
    color: rgb(225, 227, 229);
    background-color: rgb(15, 15, 15);
  }

  input {
    background-color: rgb(15, 15, 15);
    border: 1px solid transparent;
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

  .btnRegister {
    background-color: rgb(220, 61, 32);
    color: rgb(225, 227, 229);
  }
`,
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private elementref: ElementRef,
    private renderer: Renderer2
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user: RegisterRequest = this.registerForm.value;
      this.registerService.register(user).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful!';
          this.errorMessage = null;
          if (response.message === 'Empleado already exists') {
            this.errorMessage = response.message;
          } else {
            this.registerForm.reset();
            this.modal();
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.successMessage = null;
          console.log(error);
        },
      });
    }
  }

  modal() {
    const modal = this.elementref.nativeElement.querySelector('#registerModal');
    this.renderer.removeClass(modal, 'show');
    this.renderer.setStyle(modal, 'display', 'none');
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}
