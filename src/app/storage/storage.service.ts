import {Injectable} from '@angular/core';
import {
    Firestore,
    collection,
    collectionData,
    doc,
    docData,
    setDoc,
    where,
    query,
    deleteDoc
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {NoteInterface} from "../entities/note.interface";
import {Timestamp} from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private firestore: Firestore) { }

    getNotesByUserUID(userUID: string): Observable<NoteInterface[]> {
        const firebaseRef = collection(this.firestore, 'notes');
        const firebaseQuery = query(firebaseRef, where('userUID', '==', userUID));

        return collectionData(firebaseQuery, { idField: 'id' }).pipe(
            map(notes => notes.map(note => ({
                ...note,
                createdAt: note['createdAt'] instanceof Timestamp ? note['createdAt'].toDate() : new Date()
            })) as NoteInterface[])
        );
    }

    async updateNoteById(newNote: NoteInterface): Promise<void> {
        const noteRef = doc(this.firestore, 'notes', newNote.id);

        await setDoc(noteRef, newNote);
    }

    createNote(note: NoteInterface): Promise<void> {
        const firebaseRef = collection(this.firestore, 'notes');
        return setDoc(doc(firebaseRef), note);
    }

    deleteNoteById(note: NoteInterface) {
        const firebaseRef = collection(this.firestore, 'notes');
        return deleteDoc(doc(firebaseRef, note.id))
    }
}
