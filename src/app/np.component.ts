import { Component, Input, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from './note.service';

@Component({
  selector: 'np-root',
  templateUrl: './np.component.html',
  styleUrls: ['./np.component.css'],
  providers: [NoteService]
})
export class NPComponent implements OnInit{

  title = 'angular-demo';
  noteList: Note[];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(data => {
      this.noteList = data._embedded.noteList;
    });
  }

  removeNote(id: number): void {
    this.noteList.splice(id-1, 1);
    this.noteService.deleteNote(id);
  }
}
