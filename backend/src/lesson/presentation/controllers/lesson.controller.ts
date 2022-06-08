import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response } from '@nestjs/common';
import {
  CreateLessonUseCase,
  FindByIdLessonUseCase, FindDetailsLessonUseCase, PaginatedLessonUseCase, RemoveLessonUseCase,
  UpdateLessonUseCase,
} from '../../../lesson/application/useCases';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { Lesson } from '../../../lesson/domain/entities/lesson.entity';
import { LessonPaginatedDto } from '../../../lesson/application/dtos/lesson.paginated.dto';
import { LessonCreateDto } from '../../../lesson/application/dtos/lesson.create.dto';
import { LessonUpdateDto } from '../../../lesson/application/dtos/lesson.update.dto';
import { LessonMappers } from '../../infra/mappers/lesson.mapper';

@Controller('lesson')
export class LessonController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdLessonUseCase,
    private readonly createLesson: CreateLessonUseCase,
    private readonly updateLesson: UpdateLessonUseCase,
    private readonly removeLesson: RemoveLessonUseCase,
    private readonly paginatedLesson: PaginatedLessonUseCase,
    private readonly findDetailsLesson: FindDetailsLessonUseCase) {

    this._logger = new Logger('LessonController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const lesson = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<Lesson>(res, lesson, LessonMappers.DomainToDto);
  }

  @Get('details/:id')
  async findDetails(@Param() params, @Response() res) {
    this._logger.log('Find One Details');

    const lesson = await this.findDetailsLesson.execute({ id: params.id });
    return ProcessResponse.setResponse<Lesson>(res, lesson, LessonMappers.DomainToDetails);
  }


  @Post()
  async getAllPaginated(@Body() body: LessonPaginatedDto, @Response() res) {
    this._logger.log('Paginated');

    const pag = await this.paginatedLesson.execute(body);
    return ProcessResponse.setResponse(res, pag, LessonMappers.PaginatedToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: LessonCreateDto, @Response() res) {

    this._logger.log('Create');

    const lesson = await this.createLesson.execute(body);
    return ProcessResponse.setResponse<Lesson>(res, lesson, LessonMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: LessonUpdateDto, @Response() res) {
    this._logger.log('Update');

    const lesson = await this.updateLesson.execute(body);
    return ProcessResponse.setResponse<Lesson>(res, lesson, LessonMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const lesson = await this.removeLesson.execute(body);
    return ProcessResponse.setResponse<Lesson>(res, lesson, LessonMappers.DomainToDto);
  }
}
