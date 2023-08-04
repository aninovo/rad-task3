import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CategoryStatsModel,
  noteCategories,
  NoteModel,
} from './notes.interface';
import { extractDatesFromString } from './notes.util';

const mock: Array<NoteModel> = [
  {
    id: 0,
    name: 'Shopping list',
    creationDate: new Date(Date.now()),
    category: 'Task',
    description: 'Tomatoes, bread',
    dates: [],
    archived: false,
  },
  {
    id: 1,
    name: 'The theory of evolution',
    creationDate: new Date(Date.now()),
    category: 'Random Thought',
    description:
      'The theory of evolution is a biological theory that explains how living things on Earth have their origin in other preexisting types and how they change over time.',
    dates: [],
    archived: false,
  },

  {
    id: 2,
    name: 'New feature',
    creationDate: new Date(Date.now()),
    category: 'Idea',
    description: 'Implement a new feature by 3/5/2023; moved from 3/4/2023',
    dates: [new Date(2023, 5, 3), new Date(2023, 4, 3)],
    archived: false,
  },
]; // Database mock

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
