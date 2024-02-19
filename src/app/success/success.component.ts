import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css', '../app.component.css']
})
export class SuccessComponent {
  router: Router = inject(Router);


  goToTravel(): void {
    this.router.navigate(['/travel']);
  }
}
