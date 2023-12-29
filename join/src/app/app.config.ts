import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"join-em-8442d","appId":"1:341152742827:web:fb937e2fb76654e198e6ee","storageBucket":"join-em-8442d.appspot.com","apiKey":"AIzaSyArG4aIXvIijBGnTMRQMk8Y_pP-VNkXG9Y","authDomain":"join-em-8442d.firebaseapp.com","messagingSenderId":"341152742827"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"join-em-8442d","appId":"1:341152742827:web:fb937e2fb76654e198e6ee","storageBucket":"join-em-8442d.appspot.com","apiKey":"AIzaSyArG4aIXvIijBGnTMRQMk8Y_pP-VNkXG9Y","authDomain":"join-em-8442d.firebaseapp.com","messagingSenderId":"341152742827"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
