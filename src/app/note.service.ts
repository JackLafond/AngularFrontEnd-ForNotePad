import { Note } from './note';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    private noteAPIUrl: string;

    constructor(private http: HttpClient) {
        this.noteAPIUrl = 'http://localhost:8080/notes'
    }

    getNotes(): Observable<any> {
        return this.http.get<any>(this.noteAPIUrl);
    }

    addNote(note: Note) {
        this.http.post<Note>(this.noteAPIUrl, note).subscribe();
    }

    deleteNote(id: number) {
        let deleteUrl : string = this.noteAPIUrl + '/' + id;
        this.http.delete(deleteUrl).subscribe();
    }

    updateNote(note: Note) {
        let putUrl : string = this.noteAPIUrl + '/' + note.id;
        this.http.put<Note>(putUrl, note).subscribe();
    }

}