import { CanActivateFn, Router, Routes } from '@angular/router';
import { getAuth } from "firebase/auth";
import { LoginComponent } from './login/login.component';
import { FlightComponent } from './flight/flight.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { inject } from '@angular/core';
import { SuccessComponent } from './success/success.component';

export function flagGuard(
    redirectRoute: string
  ): CanActivateFn {
    return () => {
        // check if the user is logged in otherwise redirect to login
      const router: Router = inject(Router);
      const loggedIn = getAuth().currentUser != null ? true : false;
      
      return loggedIn || router.createUrlTree([redirectRoute]);
    };
  }

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'flight', component: FlightComponent, canActivate: [flagGuard('/login')]},
    { path: 'success', component: SuccessComponent, canActivate: [flagGuard('/login')]},
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
