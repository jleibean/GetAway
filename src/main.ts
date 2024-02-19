import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

const firebaseConfig = {
  apiKey: "AIzaSyAPr34G8dfu6UGMId_9iKdIwPSJio2e6nw",
  authDomain: "getaway-23383.firebaseapp.com",
  projectId: "getaway-23383",
  storageBucket: "getaway-23383.appspot.com",
  messagingSenderId: "292031554434",
  appId: "1:292031554434:web:a4362621a0869a6292259b",
  measurementId: "G-L5M7T8PG0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);