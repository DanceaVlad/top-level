import {Component, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../authentication/auth.service";
import {SignInComponent} from "../authentication/sign-in/sign-in.component";
import {SignUpComponent} from "../authentication/sign-up/sign-up.component";

@Component({
  selector: 'app-side-menu',
  standalone: true,
    imports: [
        RouterLink,
        SignInComponent,
        SignUpComponent
    ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit {

    isVisible = signal(false);
    offset: number = 10;
    visibility: string = '0';

    openMenu(): void {
        this.isVisible.set(!this.isVisible());
        this.offset= 0;
        this.visibility = '1';
    }

    closeMenu(): void {
        this.isVisible.set(!this.isVisible());
        this.offset = 10;
        this.visibility = '0';
    }

    authService = inject(AuthService);

    ngOnInit() {
        this.authService.user$.subscribe((user) => {
            if (user) {
                this.authService.currentUserSig.set({
                    email: user.email!,
                    username: user.displayName!,
                });
            } else {
                this.authService.currentUserSig.set(null);
            }
        });
    }

    logout() {
        this.authService.signOut();
    }

    signInClicked: boolean = false;
    signUpClicked: boolean = false;
    onClickSignIn() {
        this.signInClicked = true;
        this.signUpClicked = false;
    }

    onClickSignUp() {
        this.signUpClicked = true;
        this.signInClicked = false;
    }
}
