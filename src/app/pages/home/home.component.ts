import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="home">
      <h1 class="mt-4">
        <span style="color:#EC8305">2</span>Blokes Exhibiciones - Diseños
      </h1>
    </div>
  `,
  styles: `
    h1 {
      color: white;
      font-size: 100px;
      text-align: center; 
      margin: 0; 
    }
    .home {
      margin-top: 10rem;
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; 
      flex-direction: column; 
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 50px; 
      }
      .home {
        margin-top: 5rem; 
      }
    }

    @media (max-width: 480px) {
      h1 {
        font-size: 30px; 
      }
      .home {
        margin-top: 3rem; 
      }
    }
  `,
})
export class HomeComponent {}
