export interface EditableNoteModel {
  name: string;
  category: string;
  description: string;
}

export interface NoteModel extends EditableNoteModel {
  id?: number;
  creationDate: Date;
  dates: Date[];
}
