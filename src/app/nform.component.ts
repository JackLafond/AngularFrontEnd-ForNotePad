import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Note } from './note';
import { NoteService } from './note.service';
 
@Component({
    selector: 'note-form',
    templateUrl: './nform.component.html',
    styleUrls: ['./nform.component.css']
})
export class NoteFormComponent implements OnInit {

    noteForm: FormGroup;
    note: Note;

    constructor(private fb: FormBuilder, private ns: NoteService) {}

    ngOnInit(): void {
        this.noteForm = this.fb.group({
            title: ['', [Validators.required]],
            details: ['', [Validators.required]],
            date: ['', [Validators.required]],
            checkboxes: new FormArray([])
        });
    }

    save() {
        
        let n = new Note(0, this.noteForm.controls['title'].value, 
                            this.noteForm.controls['date'].value, 
                            this.noteForm.controls['details'].value,
                            this.noteForm.controls['checkboxes'].value);
        this.ns.addNote(n);
    }

    addCheckbox() {
        this.checkboxFormArray.push(new FormControl('', Validators.required)); 
    }

    deleteCheckbox() {
        this.checkboxFormArray.removeAt(this.checkboxFormArray.length - 1);
    }

    get checkboxFormArray() {
        return this.noteForm.controls.checkboxes as FormArray;
    }

    checkMissing(i : number) : boolean {
        return (<FormArray>this.noteForm.get('checkboxes')).controls[i].errors?.required
    }
}