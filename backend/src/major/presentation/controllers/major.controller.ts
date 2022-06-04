import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response } from '@nestjs/common';
import {
  CreateMajorUseCase,
  FindByIdMajorUseCase,
  PaginatedMajorUseCase,
  RemoveMajorUseCase,
  UpdateMajorUseCase,
} from '../../application/useCases';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { Major } from '../../domain/entities/major.entity';
import { MajorPaginatedDto } from '../../application/dtos/major.paginated.dto';
import { MajorUpdateDto } from '../../application/dtos/major.update.dto';
import { MajorCreateDto } from '../../application/dtos/major.create.dto';
import { MajorMappers } from '../../infra/mappers/major.mappers';

@Controller('major')
export class MajorController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdMajorUseCase,
    private readonly createMajorUseCase: CreateMajorUseCase,
    private readonly updateMajorUseCase: UpdateMajorUseCase,
    private readonly removeMajorUseCase: RemoveMajorUseCase,
    private readonly paginatedMajorUseCase: PaginatedMajorUseCase) {
    this._logger = new Logger('MajorController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const major = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<Major>(res, major, MajorMappers.DomainToDto);

  }

  @Post()
  async getAllPaginated(@Body() body: MajorPaginatedDto, @Response() res) {
    this._logger.log('Paginated');

    const pag = await this.paginatedMajorUseCase.execute(body);
    return ProcessResponse.setResponse(res, pag, MajorMappers.PaginatedToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: MajorCreateDto, @Response() res) {
    this._logger.log('Create');

    const major = await this.createMajorUseCase.execute(body);
    return ProcessResponse.setResponse<Major>(res, major, MajorMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: MajorUpdateDto, @Response() res) {
    this._logger.log('Update');

    const major = await this.updateMajorUseCase.execute(body);
    return ProcessResponse.setResponse<Major>(res, major, MajorMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const major = await this.removeMajorUseCase.execute(body);
    return ProcessResponse.setResponse<Major>(res, major, MajorMappers.DomainToDto);
  }


}
