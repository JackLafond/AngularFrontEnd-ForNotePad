import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Note } from './note';
import { NoteService } from './note.service';
 
@Component({
    selector: 'edit-form',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditFormComponent implements OnInit {

    editForm: FormGroup;
    noteList: Note[] = new Array<Note>(new Note(0));
    curNote: Note;
    curChecks: String[];
    ix: number;

    constructor(private fb: FormBuilder, private ns: NoteService) {}

    ngOnInit(): void {

        this.editForm = this.fb.group({
            title: ['', [Validators.required]],
            details: ['', [Validators.required]],
            date: ['', [Validators.required]],
            checkboxes: new FormArray([])
        });

        this.ns.getNotes().subscribe(data => {
            this.noteList = data._embedded.noteList;
            this.curNote = this.noteList?.at(0)!;
            this.curChecks = this.curNote.checkboxes;
            this.updateEditForm();
        });
        this.ix = 0;
    }

    save() {
        let id : number = 0;
        if(this.curNote) {
            id = this.curNote.id;
        }
        let n = new Note(id, this.editForm.controls['title'].value, 
                            this.editForm.controls['date'].value, 
                            this.editForm.controls['details'].value,
                            this.editForm.controls['checkboxes'].value);
        this.ns.updateNote(n);
    }

    addCheckbox() {
        this.checkboxFormArray.push(new FormControl('', Validators.required));
    }

    deleteCheckbox() {
        this.checkboxFormArray.removeAt(this.checkboxFormArray.length - 1);
    }

    nextNote() : void {
        if(this.ix <= this.noteList.length - 2) {
            this.ix = this.ix + 1;
            this.curNote = this.noteList.at(this.ix)!;
            this.curChecks = this.curNote.checkboxes;
            this.updateEditForm();
        }
    }

    prevNote() : void {
        if(this.ix >= 1) {
            this.ix = this.ix - 1;
            this.curNote = this.noteList.at(this.ix)!;
            this.curChecks = this.curNote.checkboxes;
            this.updateEditForm();
        }
    }

    get checkboxFormArray() {
        return this.editForm.get('checkboxes') as FormArray;
    }

    updateEditForm() : void {
        this.editForm.controls['title'].setValue(this.curNote.title);
        this.editForm.controls['date'].setValue(this.curNote.date);
        this.editForm.controls['details'].setValue(this.curNote.details);
        while(this.checkboxFormArray.length !== 0) {
            this.checkboxFormArray.removeAt(0);
        }
        this.curChecks.forEach(
            (check) => this.checkboxFormArray.push(new FormControl(check, Validators.required))
        )
    }

    checkMissing(i : number) : boolean {
        return (<FormArray>this.editForm.get('checkboxes')).controls[i].errors?.required
    }

}