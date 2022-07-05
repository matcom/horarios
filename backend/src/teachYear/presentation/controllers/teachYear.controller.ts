import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response } from '@nestjs/common';
import {
  CreateTeachYearUseCase,
  FindByIdTeachYearUseCase, FindDetailsTeachYearUseCase, PaginatedTeachYearUseCase, RemoveTeachYearUseCase,
  UpdateTeachYearUseCase,
} from '../../../teachYear/application/useCases';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { TeachYear } from '../../../teachYear/domain/entities/teachYear.entity';
import { TeachYearPaginatedDto } from '../../../teachYear/application/dtos/teachYear.paginated.dto';
import { TeachYearCreateDto } from '../../../teachYear/application/dtos/teachYear.create.dto';
import { TeachYearUpdateDto } from '../../../teachYear/application/dtos/teachYear.update.dto';
import { TeachYearMapper } from '../../infra/mappers/teachYear.mapper';

@Controller('teachYear')
export class TeachYearController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdTeachYearUseCase,
    private readonly createTeachYear: CreateTeachYearUseCase,
    private readonly updateTeachYear: UpdateTeachYearUseCase,
    private readonly removeTeachYear: RemoveTeachYearUseCase,
    private readonly paginatedTeachYear: PaginatedTeachYearUseCase,
    private readonly findDetailsTeachYear: FindDetailsTeachYearUseCase) {

    this._logger = new Logger('TeachYearController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const teachYear = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<TeachYear>(res, teachYear, TeachYearMapper.DomainToDto);
  }

  @Get('details/:id')
  async findDetails(@Param() params, @Response() res) {
    this._logger.log('Find One Details');

    const teachYear = await this.findDetailsTeachYear.execute({ id: params.id });
    return ProcessResponse.setResponse<TeachYear>(res, teachYear, TeachYearMapper.DomainToDetails);
  }


  @Post()
  async getAllPaginated(@Body() body: TeachYearPaginatedDto, @Response() res) {
    this._logger.log('Paginated');

    const pag = await this.paginatedTeachYear.execute(body);
    return ProcessResponse.setResponse(res, pag, TeachYearMapper.PaginatedToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: TeachYearCreateDto, @Response() res) {

    this._logger.log('Create');

    const teachYear = await this.createTeachYear.execute(body);
    return ProcessResponse.setResponse<TeachYear>(res, teachYear, TeachYearMapper.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: TeachYearUpdateDto, @Response() res) {
    this._logger.log('Update');

    const teachYear = await this.updateTeachYear.execute(body);
    return ProcessResponse.setResponse<TeachYear>(res, teachYear, TeachYearMapper.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const teachYear = await this.removeTeachYear.execute(body);
    return ProcessResponse.setResponse<TeachYear>(res, teachYear, TeachYearMapper.DomainToDto);
  }
}
