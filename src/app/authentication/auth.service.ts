import {inject, Injectable, OnDestroy, signal} from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    user,
    signOut
} from "@angular/fire/auth";
import {from, Observable, Subscription} from "rxjs";
import {UserInterface} from "../entities/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined);
    private userSubscription: Subscription;

    constructor() {
        this.userSubscription = this.user$.subscribe(user => {
            if (user) {
                this.currentUserSig.set({username: user.displayName!, email: user.email!, userUID: user.uid!});
                console.log('User signed in');
            } else {
                this.currentUserSig.set(null);
                console.log('User signed out');
            }
        });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    signUp(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this. firebaseAuth, email, password)
            .then((response) => {
                updateProfile(response.user, { displayName: username });
            });
        return from(promise);
    }

    signIn(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
            .then(() => {});
        return from(promise);
    }

    signOut(): Observable<void> {
        const promise = signOut(this.firebaseAuth)
            .then(() => {});
        return from(promise);
    }
}
