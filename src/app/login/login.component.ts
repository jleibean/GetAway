import { Component } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})


export class LoginComponent {
  constructor(private router: Router) {

  }

  signIn(source: string) {
    const auth = getAuth();
    let provider: any = null;
    let service: any = null;
    switch (source) {
      case 'google': provider = new GoogleAuthProvider(); service = GoogleAuthProvider; break;
      case 'twitter': provider = new TwitterAuthProvider(); service = TwitterAuthProvider; break;
      default: provider = new GoogleAuthProvider(); service = GoogleAuthProvider;
    }
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = service.credentialFromResult(result);
        // The signed-in user info.
        this.router.navigate(['/flight']);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = service.credentialFromError(error);
        error.log(`Error logging ${email} in:`, errorCode, errorMessage, email, credential);
      });
  }


}

