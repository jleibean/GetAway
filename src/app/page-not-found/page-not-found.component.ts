import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css', '../app.component.css']
})
export class PageNotFoundComponent {
  router: Router = inject(Router);

  backToHome(){
    this.router.navigate(['/login']);
  }
}
