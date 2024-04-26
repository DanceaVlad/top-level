import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../authentication/auth.service";
import {HeaderComponent} from "../header/header.component";
import {MatGridListModule} from '@angular/material/grid-list';
import {NgOptimizedImage} from "@angular/common";
import {MatRippleModule} from '@angular/material/core';

export interface Tile {
    imgSrc: string;
    cols: number;
    rows: number;
    routerLink: string;
    text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        HeaderComponent,
        MatGridListModule,
        NgOptimizedImage,
        MatRippleModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

    authService = inject(AuthService);

    tiles: Tile[] = [
        {imgSrc: 'https://previews.123rf.com/images/scyther5/scyther51702/scyther5170200189/72952393-brainstorming-brainstorm-strategy-workshop-business-note-notes-stickyconcept-stock-image.jpg', cols: 1, rows: 2, routerLink: '/notes', text: '1'},
        {imgSrc: 'https://plus.unsplash.com/premium_photo-1664457233868-d2a40c759998?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', cols: 2, rows: 1, routerLink: '', text: '2'},
        {imgSrc: 'https://plus.unsplash.com/premium_photo-1664457233868-d2a40c759998?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', cols: 1, rows: 1, routerLink: '', text: '3'},
        {imgSrc: 'https://plus.unsplash.com/premium_photo-1664457233868-d2a40c759998?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', cols: 1, rows: 2, routerLink: '', text: '4'},
        {imgSrc: 'https://plus.unsplash.com/premium_photo-1664457233868-d2a40c759998?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', cols: 2, rows: 1, routerLink: '', text: '5'},
    ];

    ngOnInit() {
        this.authService.user$.subscribe((user) => {
            if (user) {
                this.authService.currentUserSig.set({
                    email: user.email!,
                    username: user.displayName!,
                    userUID: user.uid!
                });
            } else {
                this.authService.currentUserSig.set(null);
            }
        });
    }
}
