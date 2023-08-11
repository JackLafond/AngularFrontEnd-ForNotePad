import { Component, Input} from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'note-entry',
    templateUrl: './en.component.html',
    styleUrls: ['./en.component.css']
})

export class EntryComponent {
    @Input() id: number;
    @Input() title: string = 'Title';
    @Input() details: string = 'Notes';
    @Input() date: string = '6/15/23';
    @Input() checkboxes: Array<String> = [];
    @Input() edit: boolean = false;
}

