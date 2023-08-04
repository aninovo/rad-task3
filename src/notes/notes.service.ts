import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CategoryStatsModel,
  noteCategories,
  NoteModel,
} from './notes.interface';
import mock from './notes.mock-data';
import { extractDatesFromString } from './notes.util';

@Injectable()
export class NotesService {
  private notes: Array<NoteModel> = mock;

  public findAll(): Array<NoteModel> {
    return this.notes;
  }

  public findOne(id: number): NoteModel {
    const note: NoteModel = this.notes.find((note) => note.id === id);

    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return note;
  }

  public create(note: NoteModel): NoteModel {
    // find the next id for a new blog post
    const maxId: number = Math.max(...this.notes.map((post) => post.id), 0);
    const id: number = maxId + 1;

    // Init the new object
    const newNote: NoteModel = {
      ...note,
      dates: extractDatesFromString(note.description),
      id,
    };

    if (newNote.creationDate === undefined)
      newNote.creationDate = new Date(Date.now());

    if (newNote.dates === undefined) newNote.dates = [];

    this.notes.push(newNote);

    return newNote;
  }

  public update(id: number, note: NoteModel): NoteModel {
    const index: number = this.notes.findIndex((note) => note.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Note not found.');
    }

    const oldData = this.notes[index];

    const newData: NoteModel = {
      ...oldData,
      ...note,
      dates: extractDatesFromString(note.description),
    };

    this.notes[index] = newData;

    return newData;
  }

  public delete(id: number): void {
    const index: number = this.notes.findIndex((note) => note.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Note not found.');
    }

    this.notes.splice(index, 1);
  }

  public getStats(): Array<CategoryStatsModel> {
    return noteCategories.map((category) => {
      return {
        category: category,
        active: this.notes.filter(
          (note) => note.category === category && note.archived === false,
        ).length,
        archived: this.notes.filter(
          (note) => note.category === category && note.archived === false,
        ).length,
      };
    });
  }
}
