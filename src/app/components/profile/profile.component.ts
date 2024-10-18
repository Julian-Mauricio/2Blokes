import { AppComponent } from './../../app.component';
import { DeleteProfileService } from './../../core/services/delete-profile.service';
import { ProfileRequest } from './../../interfaces/profile-request';
import { ProfileService } from './../../core/services/profile.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginId } from '../../interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card bg mt-4" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title" style="color:#EC8305">Perfil</h5>
      </div>
      <ul class="bg list-group list-group-flush">
        <li class="bg list-group-item mt-2 mb-2" style="color:#EC8305">
          Nombre: <span>{{ profile?.name }}</span>
        </li>
        <li class="bg list-group-item mt-2 mb-2" style="color:#EC8305">
          Email: <span>{{ profile?.email }}</span>
        </li>
        <li class="bg list-group-item mt-2 mb-2" style="color:#EC8305">
          Rol: <span>{{ profile?.role }}</span>
        </li>
      </ul>
      <div class="card-body bg">
        <button
          type="button"
          class="btn btnSeccion w-100"
          (click)="deleteUser()"
        >
          Eliminar Perfil
        </button>
        <div
          *ngIf="showAlert"
          class="text-danger d-flex justify-content-center mt-3"
          role="alert"
        >
          {{ alertMessage }}
        </div>
      </div>
    </div>
  `,
  styles: `
  .bg{
    background-color: rgb(33,37,41)
  }
  span {
        color: rgb(225, 227, 229);
      }
      .list-group-item {
      border-color: transparent; 
    }
    .list-group-item + .list-group-item {
      border-top: 1px solid #EC8305; 
    }
    .btnSeccion{
      color:white;
      border:1px solid #EC8305;
      font-weight: bold;
    }
    .btnSeccion:hover {
    color: #EC8300;
    border:1px solid white;
    font-weight: bold;
    }
 `,
})
export class ProfileComponent {
  public profile!: ProfileRequest;
  public showAlert: boolean = false;
  public alertMessage: string = '';

  constructor(
    private profileService: ProfileService,
    private appComponent: AppComponent,
    private deleteProfileService: DeleteProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.profile().subscribe((data) => {
      this.profile = data;
      console.log(this.profile);
    });
  }

  deleteUser(): void {
    const id = this.profile.id.toString();
    this.deleteProfileService.deleteProfile(id).subscribe({
      next: (response) => {
        this.alertMessage = response;
        this.showAlert = true;
        this.redirectHome();
      },
      error: (error) => {
        this.alertMessage = 'Error al eliminar el perfil.';
        this.showAlert = true;
      },
    });
  }

  redirectHome() {
    setTimeout(() => {
      this.appComponent.updateLoginStatus(false);
      this.router.navigate(['']);
    }, 2000);
  }
}
