import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response } from '@nestjs/common';
import {
  CreateFacultyUseCase,
  FindAllFacultyUseCase,
  FindByIdFacultyUseCase,
  FindDetailsFacultyUseCase,
  PaginatedFacultyUseCase,
  RemoveFacultyUseCase,
  UpdateFacultyUseCase,
} from '../../application/useCases';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { Faculty } from '../../domain/entities/faculty.entity';
import { FacultyPaginatedDto } from '../../application/dtos/faculty.paginated.dto';
import { FacultyUpdateDto } from '../../application/dtos/faculty.update.dto';
import { FacultyCreateDto } from '../../application/dtos/faculty.create.dto';
import { FacultyMappers } from '../../infra/mappers/faculty.mappers';
import { FacultyFindAllDto } from '../../application/dtos/faculty.find-all.dto';

@Controller('faculty')
export class FacultyController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdFacultyUseCase,
    private readonly createFaculty: CreateFacultyUseCase,
    private readonly updateFaculty: UpdateFacultyUseCase,
    private readonly removeFaculty: RemoveFacultyUseCase,
    private readonly paginatedFaculty: PaginatedFacultyUseCase,
    private readonly findAllFaculty: FindAllFacultyUseCase,
    private readonly findDetailsFaculty: FindDetailsFacultyUseCase) {

    this._logger = new Logger('FacultyController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const faculty = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<Faculty>(res, faculty, FacultyMappers.DomainToDto);

  }

  @Get('details/:id')
  async findDetails(@Param() params, @Response() res) {
    this._logger.log('Find details');

    const faculty = await this.findDetailsFaculty.execute({ id: params.id });
    return ProcessResponse.setResponse(res, faculty, FacultyMappers.DomainToDetails);

  }

  @Post()
  async getAllPaginated(@Body() body: FacultyPaginatedDto, @Response() res) {
    this._logger.log('Paginated');

    const pag = await this.paginatedFaculty.execute(body);
    return ProcessResponse.setResponse(res, pag, FacultyMappers.PaginatedToDto);
  }


  @Post('all')
  async getAll(@Body() body: FacultyFindAllDto, @Response() res) {
    this._logger.log('Get All');

    const ans = await this.findAllFaculty.execute(body);
    return ProcessResponse.setResponse(res, ans, FacultyMappers.AllToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: FacultyCreateDto, @Response() res) {

    this._logger.log('Create');

    const university = await this.createFaculty.execute(body);
    return ProcessResponse.setResponse<Faculty>(res, university, FacultyMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: FacultyUpdateDto, @Response() res) {
    this._logger.log('Update');

    const university = await this.updateFaculty.execute(body);
    return ProcessResponse.setResponse<Faculty>(res, university, FacultyMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const university = await this.removeFaculty.execute(body);
    return ProcessResponse.setResponse<Faculty>(res, university, FacultyMappers.DomainToDto);
  }


}