import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response } from '@nestjs/common';
import {
  CreateClassUseCase,
  FindByIdClassUseCase,
  FindDetailsClassUseCase,
  PaginatedClassUseCase,
  RemoveClassUseCase,
  UpdateClassUseCase,
} from '../../application/useCases';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { Class } from '../../domain/entities/class.entity';
import { ClassPaginatedDto } from '../../application/dtos/class.paginated.dto';
import { ClassUpdateDto } from '../../application/dtos/class.update.dto';
import { ClassCreateDto } from '../../application/dtos/class.create.dto';
import { ClassMappers } from '../../infra/mappers/class.mapper';

@Controller('class')
export class ClassController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdClassUseCase,
    private readonly createClass: CreateClassUseCase,
    private readonly updateClass: UpdateClassUseCase,
    private readonly removeClass: RemoveClassUseCase,
    private readonly paginatedClass: PaginatedClassUseCase,
    private readonly findDetailsClass: FindDetailsClassUseCase) {

    this._logger = new Logger('ClassController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const c = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<Class>(res, c, ClassMappers.DomainToDto);
  }

  @Get('details/:id')
  async findDetails(@Param() params, @Response() res) {
    this._logger.log('Find One Details');

    const c = await this.findDetailsClass.execute({ id: params.id });
    return ProcessResponse.setResponse<Class>(res, c, ClassMappers.DomainToDetails);
  }


  @Post()
  async getAllPaginated(@Body() body: ClassPaginatedDto, @Response() res) {
    this._logger.log('Paginated');

    const pag = await this.paginatedClass.execute(body);
    return ProcessResponse.setResponse(res, pag, ClassMappers.PaginatedToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: ClassCreateDto, @Response() res) {

    this._logger.log('Create');

    const c = await this.createClass.execute(body);
    return ProcessResponse.setResponse<Class>(res, c, ClassMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: ClassUpdateDto, @Response() res) {
    this._logger.log('Update');

    const c = await this.updateClass.execute(body);
    return ProcessResponse.setResponse<Class>(res, c, ClassMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const c = await this.removeClass.execute(body);
    return ProcessResponse.setResponse<Class>(res, c, ClassMappers.DomainToDto);
  }
}
