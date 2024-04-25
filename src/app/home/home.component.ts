import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../authentication/auth.service";
import {SideMenuComponent} from "../side-menu/side-menu.component";
import {ProjectCardComponent} from "../project-card/project-card.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        SideMenuComponent,
        ProjectCardComponent,
        HeaderComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

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

}
