import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response, UseGuards } from '@nestjs/common';
import {
  CreateUniversityUseCase,
  FindByIdUniversityUseCase,
  RemoveUniversityUseCase,
  UpdateUniversityUseCase,
} from '../../application/useCases';
import { UniversityMapper } from '../../infra/mappers/university.mapper';
import { JwtAuthGuard } from '../../../auth/application/Guards/JwtAuthGuard';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { UniversityCreateDto } from '../../application/dtos/university.create.dto';
import { University } from '../../domain/entities/university.entity';
import { UniversityUpdateDto } from '../../application/dtos/university.update.dto';

@Controller('university')
export class UniversityController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdUniversityUseCase,
    private readonly createUniversity: CreateUniversityUseCase,
    private readonly updateUniversity: UpdateUniversityUseCase,
    private readonly removeUniversity: RemoveUniversityUseCase) {
    this._logger = new Logger('UniversityController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const university = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<University>(res, university, UniversityMapper.DomainToDto);

  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: UniversityCreateDto, @Response() res) {

    this._logger.log('Create');

    const university = await this.createUniversity.execute(body);
    return ProcessResponse.setResponse<University>(res, university, UniversityMapper.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: UniversityUpdateDto, @Response() res) {
    this._logger.log('Update');

    const university = await this.updateUniversity.execute(body);
    return ProcessResponse.setResponse<University>(res, university, UniversityMapper.DomainToDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const university = await this.removeUniversity.execute(body);
    return ProcessResponse.setResponse<University>(res, university, UniversityMapper.DomainToDto);
  }

}