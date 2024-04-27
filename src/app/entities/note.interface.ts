import { Timestamp } from 'firebase/firestore';

export interface NoteInterface {
    id: string;
    userUID: string;
    title: string;
    content: string;
    isCompleted: boolean;
    createdAt: Date
}
