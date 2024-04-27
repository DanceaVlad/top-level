import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {StorageService} from "../../storage/storage.service";
import {AuthService} from "../../authentication/auth.service";
import {NoteInterface} from "../../entities/note.interface";
import {HeaderComponent} from "../../header/header.component";
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from "@angular/material/icon";
import {of, Subscription, switchMap} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [
        MatTableModule, MatButtonModule, MatIconModule, HeaderComponent, DatePipe
    ],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.scss',
    animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('void => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ]),
    ]
})
export class NotesComponent implements OnInit, OnDestroy{

    storageService = inject(StorageService);
    authService = inject(AuthService);

    userNotes: NoteInterface[] = [];


    private subscription: Subscription = new Subscription();

    displayedColumns: string[] = ['title', 'isCompleted', 'userUID', 'createdAt'];
    expandedElement: NoteInterface | null = null;

    ngOnInit() {
        this.subscription.add(
            this.authService.user$.pipe(
                switchMap(user => {
                    if (user) {
                        return this.storageService.getNotesByUserUID(user.uid);
                    } else {
                        return of([]);
                    }
                })
            ).subscribe(notes => {
                this.userNotes = notes;
            })
        );
    }

    createNote() {
        const note: NoteInterface = {
            id: '',
            userUID: this.authService.currentUserSig()?.userUID!,
            title: 'New Note',
            content: 'New Note Content',
            isCompleted: false,
            createdAt: new Date(),
        };

        this.authService.user$.subscribe((user) => {
            if (user) {
                this.storageService.createNote(note).then(() => {
                    this.storageService.getNotesByUserUID(user.uid).subscribe((notes) => {
                        this.userNotes = notes;
                    });
                });
            } else {
                console.log('No user found');
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.userNotes = [];
    }

    changeCompletion(note: NoteInterface) {
        note.isCompleted = !note.isCompleted;
        this.storageService.updateNoteById(note).then(() => {});
    }

    delete(note: NoteInterface) {
        this.storageService.deleteNoteById(note).then(() => {});
    }
}
