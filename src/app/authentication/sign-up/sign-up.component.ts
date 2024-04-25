import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        HttpClientModule
    ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    authService = inject(AuthService);
    router = inject(Router);

    form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    });
    errorMessage: string | null = null;

    onSubmit(): void {
        const rawForm = this.form.getRawValue();
        this.authService.signUp(rawForm.email, rawForm.username ,rawForm.password).subscribe({
            next: () => {
                this.router.navigateByUrl('/home');
            },
            error: (error) => {
                this.errorMessage = error.code;
            }
        });
    }
}
