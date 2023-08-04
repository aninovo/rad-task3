## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Not implemented yet

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Files

### src/notes

*notes.interface.ts* - describes types that are used in requests (EditableNoteModel), storage (NoteModel) and responces (CategoryStatsModel)

*notes.service.ts* - holds logic of serving the requests

*notes.controller.ts* - defines routes

*notes.mock-data.ts* - holds an array that represents data storage

*notes.util.ts* - holds a function used to extract dates from a note's content

*notes.yup.schema.ts* - defines a validation schema

### src/pipes

*yupValidationPipe.ts* - defines a Nest pipe used for validation with Yup
