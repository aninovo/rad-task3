import { NoteModel } from './notes.interface';

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

export default mock;
