import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response } from '@nestjs/common';
import {
  CreateTeacherUseCase,
  FindByIdTeacherUseCase,
  FindDetailsTeacherUseCase,
  PaginatedTeacherUseCase,
  RemoveTeacherUseCase,
  UpdateTeacherUseCase,
} from '../../application/useCases';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { Teacher } from '../../domain/entities/teacher.entity';
import { TeacherPaginatedDto } from '../../application/dtos/teacher.paginated.dto';
import { TeacherUpdateDto } from '../../application/dtos/teacher.update.dto';
import { TeacherCreateDto } from '../../application/dtos/teacher.create.dto';
import { TeacherMappers } from '../../infra/mappers/teacher.mappers';

@Controller('teacher')
export class TeacherController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdTeacherUseCase,
    private readonly createTeacher: CreateTeacherUseCase,
    private readonly updateTeacher: UpdateTeacherUseCase,
    private readonly removeTeacher: RemoveTeacherUseCase,
    private readonly paginatedTeacher: PaginatedTeacherUseCase,
    private readonly findDetailsTeacher: FindDetailsTeacherUseCase) {

    this._logger = new Logger('TeacherController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const teacher = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<Teacher>(res, teacher, TeacherMappers.DomainToDto);
  }

  @Get('details/:id')
  async findDetails(@Param() params, @Response() res) {
    this._logger.log('Find One Details');

    const teacher = await this.findDetailsTeacher.execute({ id: params.id });
    return ProcessResponse.setResponse<Teacher>(res, teacher, TeacherMappers.DomainToDetails);
  }


  @Post()
  async getAllPaginated(@Body() body: TeacherPaginatedDto, @Response() res) {
    this._logger.log('Paginated');

    const pag = await this.paginatedTeacher.execute(body);
    return ProcessResponse.setResponse(res, pag, TeacherMappers.PaginatedToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: TeacherCreateDto, @Response() res) {

    this._logger.log('Create');

    const teacher = await this.createTeacher.execute(body);
    return ProcessResponse.setResponse<Teacher>(res, teacher, TeacherMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: TeacherUpdateDto, @Response() res) {
    this._logger.log('Update');

    const teacher = await this.updateTeacher.execute(body);
    return ProcessResponse.setResponse<Teacher>(res, teacher, TeacherMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const teacher = await this.removeTeacher.execute(body);
    return ProcessResponse.setResponse<Teacher>(res, teacher, TeacherMappers.DomainToDto);
  }
}
