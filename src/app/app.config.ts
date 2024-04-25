import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyDKSRrsWGn4Pi_XecQBQS2gCkpLSdC-dAQ",
  authDomain: "top-level-44131.firebaseapp.com",
  projectId: "top-level-44131",
  storageBucket: "top-level-44131.appspot.com",
  messagingSenderId: "20141933619",
  appId: "1:20141933619:web:0a34032aa06df48fa18f46"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth())
    ]), provideAnimationsAsync(),
  ],
};
