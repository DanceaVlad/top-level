import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../authentication/auth.service";
import {SideMenuComponent} from "../side-menu/side-menu.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        SideMenuComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
