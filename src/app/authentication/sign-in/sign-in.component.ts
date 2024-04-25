import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge, Subject, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [
        FormsModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy{

    authService = inject(AuthService);
    router = inject(Router);

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    emailErrorMessage = '';
    passwordErrorMessage = '';
    firebaseErrorMessage = '';
    hide = true;
    private destroy$ = new Subject<void>();


    constructor(public dialogRef: MatDialogRef<SignInComponent>) {
        merge(this.email.statusChanges, this.email.valueChanges)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.updateErrorMessage());
    }

    ngOnInit() {
        this.email.valueChanges.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => this.updateErrorMessage());
        this.password.valueChanges.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => this.updateErrorMessage());
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    updateErrorMessage() {
        if (this.email.hasError('required')) {
            this.emailErrorMessage = 'You must enter a value';
        } else if (this.email.hasError('email')) {
            this.emailErrorMessage = 'Not a valid email';
        } else {
            this.emailErrorMessage = '';
        }

        if (this.password.hasError('required')) {
            this.passwordErrorMessage = 'You must enter a value';
        } else {
            this.passwordErrorMessage = '';
        }

        switch (this.firebaseErrorMessage) {
            case '':
                break;
            case 'auth/invalid-credential':
                this.firebaseErrorMessage = 'Username or password is incorrect';
                break;
            case 'auth/missing-password':
                this.firebaseErrorMessage = 'Please enter a password';
                break;
            case 'auth/invalid-email':
                this.firebaseErrorMessage = 'Please enter a valid email';
                break;
            case 'auth/user-disabled':
                this.firebaseErrorMessage = 'User disabled';
                break;
            default:
                this.firebaseErrorMessage = 'An error has occurred';
        }
    }

    onClickCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.email.valid && this.password.valid) {
            this.authService.signIn(this.email.value!, this.password.value!).subscribe({
                next: () => {
                    this.dialogRef.close();
                },
                error: (error) => {
                    this.firebaseErrorMessage = error.code;
                    this.updateErrorMessage();
                }
            });
        } else {
            this.email.markAsTouched();
            this.password.markAsTouched();
        }
    }


}
