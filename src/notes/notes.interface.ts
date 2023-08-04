export interface EditableNoteModel {
  name: string;
  category: string;
  description: string;
  archived: boolean;
}

export interface NoteModel extends EditableNoteModel {
  id?: number;
  creationDate: Date;
  dates: Date[];
}

export interface CategoryStatsModel {
  category: string;
  active: number;
  archived: number;
}

export const noteCategories = ['Idea', 'Random Thought', 'Task'];
