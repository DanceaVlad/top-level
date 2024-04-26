import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {StorageService} from "../../storage/storage.service";
import {AuthService} from "../../authentication/auth.service";
import {NoteInterface} from "../../entities/note.interface";
import {AsyncPipe} from "@angular/common";
import {HeaderComponent} from "../../header/header.component";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
    MatTextColumn
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {of, Subscription, switchMap} from "rxjs";

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

let ELEMENT_DATA: NoteInterface[] = [];


@Component({
  selector: 'app-notes',
  standalone: true,
    imports: [
        MatButton,
        AsyncPipe,
        HeaderComponent,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatIcon,
        MatHeaderCellDef,
        MatCellDef,
        MatTextColumn,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef
    ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit, OnDestroy{

    storageService = inject(StorageService);
    authService = inject(AuthService);

    userNotes: NoteInterface[] = [];
    displayedColumns: string[] = ['title', 'content', 'isCompleted', 'userUID'];

    private subscription: Subscription = new Subscription();

    ngOnInit() {
        this.subscription.add(
            this.authService.user$.pipe(
                switchMap(user => {
                    if (user) {
                        return this.storageService.getNotesByUserUID(user.uid);
                    } else {
                        return of([]); // Emits an empty array when no user is present
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
            isCompleted: false
        };


        this.authService.user$.subscribe((user) => {
            if (user) {
                this.storageService.createNote(note).then(() => {
                    this.storageService.getNotesByUserUID(user.uid).subscribe((notes) => {
                        this.userNotes = notes;
                        console.log(notes);
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
}
