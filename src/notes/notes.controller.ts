import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  NoteModel,
  EditableNoteModel,
  CategoryStatsModel,
} from './notes.interface';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // GET /notes Get all notes.
  @Get()
  public findAll(): Array<NoteModel> {
    return this.notesService.findAll();
  }

  // GET /notes/stats Get aggregated data statistics. You don’t have to mock this data. You need to calculate it based on notes objects you have.
  // The order of routes is important, this should stay before   @Get(':id') or it will be confused
  @Get('stats')
  public getStats(): Array<CategoryStatsModel> {
    return this.notesService.getStats();
  }

  //GET /notes/:id Retrieve item.
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): NoteModel {
    return this.notesService.findOne(id);
  }

  // POST /notes Create a note object.
  @Post()
  public create(@Body() note: EditableNoteModel): NoteModel {
    return this.notesService.create(note as NoteModel);
  }

  // PATCH /notes/:id Edit item.
  @Patch(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() note: EditableNoteModel,
  ): NoteModel {
    return this.notesService.update(id, note as NoteModel);
  }

  //DELETE /notes/:id Remove item.
  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.notesService.delete(id);
  }
}
