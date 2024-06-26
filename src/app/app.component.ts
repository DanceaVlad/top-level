import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignInComponent} from "./authentication/sign-in/sign-in.component";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, SignInComponent, SignUpComponent, HomeComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workspace';
}
