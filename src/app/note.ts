export class Note {
    constructor(
        public id : number,
        public title = '',
        public date = '',
        public details = '',
        public checkboxes = []) {}
}