import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response } from '@nestjs/common';
import {
  CreateTeachActivityUseCase,
  FindByIdTeachActivityUseCase, FindDetailsTeachActivityUseCase, PaginatedTeachActivityUseCase, RemoveTeachActivityUseCase,
  UpdateTeachActivityUseCase,
} from '../../../teachActivity/application/useCases';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { TeachActivity } from '../../../teachActivity/domain/entities/teachActivity.entity';
import { TeachActivityPaginatedDto } from '../../../teachActivity/application/dtos/teachActivity.paginated.dto';
import { TeachActivityCreateDto } from '../../../teachActivity/application/dtos/teachActivity.create.dto';
import { TeachActivityUpdateDto } from '../../../teachActivity/application/dtos/teachActivity.update.dto';
import { TeachActivityMapper } from '../../infra/mappers/teachActivity.mapper';

@Controller('teachActivity')
export class TeachActivityController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdTeachActivityUseCase,
    private readonly createTeachActivity: CreateTeachActivityUseCase,
    private readonly updateTeachActivity: UpdateTeachActivityUseCase,
    private readonly removeTeachActivity: RemoveTeachActivityUseCase,
    private readonly paginatedTeachActivity: PaginatedTeachActivityUseCase,
    private readonly findDetailsTeachActivity: FindDetailsTeachActivityUseCase) {

    this._logger = new Logger('TeachActivityController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const teachActivity = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<TeachActivity>(res, teachActivity, TeachActivityMapper.DomainToDto);
  }

  @Get('details/:id')
  async findDetails(@Param() params, @Response() res) {
    this._logger.log('Find One Details');

    const teachActivity = await this.findDetailsTeachActivity.execute({ id: params.id });
    return ProcessResponse.setResponse<TeachActivity>(res, teachActivity, TeachActivityMapper.DomainToDetails);
  }


  @Post()
  async getAllPaginated(@Body() body: TeachActivityPaginatedDto, @Response() res) {
    this._logger.log('Paginated');

    const pag = await this.paginatedTeachActivity.execute(body);
    return ProcessResponse.setResponse(res, pag, TeachActivityMapper.PaginatedToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: TeachActivityCreateDto, @Response() res) {

    this._logger.log('Create');

    const teachActivity = await this.createTeachActivity.execute(body);
    return ProcessResponse.setResponse<TeachActivity>(res, teachActivity, TeachActivityMapper.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: TeachActivityUpdateDto, @Response() res) {
    this._logger.log('Update');

    const teachActivity = await this.updateTeachActivity.execute(body);
    return ProcessResponse.setResponse<TeachActivity>(res, teachActivity, TeachActivityMapper.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const teachActivity = await this.removeTeachActivity.execute(body);
    return ProcessResponse.setResponse<TeachActivity>(res, teachActivity, TeachActivityMapper.DomainToDto);
  }
}
