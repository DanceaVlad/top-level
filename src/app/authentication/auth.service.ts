import {inject, Injectable, signal} from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    user,
    signOut
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {UserInterface} from "../entities/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

    signUp(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this. firebaseAuth, email, password)
            .then((response) =>
                updateProfile(response.user, { displayName: username }));
        return from(promise);
    }

    signIn(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
            .then(() => {});
        return from(promise);
    }

    signOut(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }
}
