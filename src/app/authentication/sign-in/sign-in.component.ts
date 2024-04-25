import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
      ReactiveFormsModule,
      HttpClientModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    router = inject(Router);
    authService = inject(AuthService);

    form = this.fb.nonNullable.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });

    errorMessage: string | null = null;

    onSubmit(): void {
        const rawForm = this.form.getRawValue();
        this.authService.signIn(rawForm.email, rawForm.password).subscribe({
            next: () => {
                this.router.navigateByUrl('');
            },
            error: (error) => {
                switch (error.code) {
                    case 'auth/missing-password':
                        this.errorMessage = 'Missing password';
                        break;
                    case 'auth/invalid-email':
                        this.errorMessage = 'Invalid email';
                        break;
                    case 'auth/invalid-credential':
                        this.errorMessage = 'Invalid credentials';
                        break;
                    default:
                        this.errorMessage = error.code;
                        break;
                }
            }
        });
    }
}
