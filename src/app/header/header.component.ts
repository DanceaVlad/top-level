import {Component, inject} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SignInComponent} from "../authentication/sign-in/sign-in.component";
import {AuthService} from "../authentication/auth.service";
import {SignUpComponent} from "../authentication/sign-up/sign-up.component";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

    constructor(public dialog: MatDialog) {}

    authService = inject(AuthService);

    openSignInDialog(): void {
        const dialogRef = this.dialog.open(SignInComponent, {
            width: 'auto',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    openSignUpDialog(): void {
        const dialogRef = this.dialog.open(SignUpComponent, {
            width: 'auto',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

}
