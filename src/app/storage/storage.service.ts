import {Injectable} from '@angular/core';
import {Firestore, collection, collectionData, doc, docData, setDoc, where, query} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {NoteInterface} from "../entities/note.interface";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private firestore: Firestore) { }

    getNotesByUserUID(userUID: string): Observable<NoteInterface[]> {
        const firebaseRef = collection(this.firestore, 'notes');
        const firebaseQuery = query(firebaseRef, where('userUID', '==', userUID));
        return collectionData(firebaseQuery) as Observable<NoteInterface[]>;
    }

    createNote(note: NoteInterface): Promise<void> {
        const firebaseRef = collection(this.firestore, 'notes');
        return setDoc(doc(firebaseRef), note);
    }

}
