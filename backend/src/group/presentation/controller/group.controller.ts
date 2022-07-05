import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Response } from '@nestjs/common';
import {
  CreateGroupUseCase,
  FindByIdGroupUseCase,
  FindDetailsGroupUseCase,
  PaginatedGroupUseCase,
  RemoveGroupUseCase,
  UpdateGroupUseCase,
} from '../../application/useCases';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import { Group } from '../../domain/entities/group.entity';
import { GroupPaginatedDto } from '../../application/dtos/group.paginated.dto';
import { GroupUpdateDto } from '../../application/dtos/group.update.dto';
import { GroupCreateDto } from '../../application/dtos/group.create.dto';
import { GroupMappers } from '../../infra/mappers/group.mapper';

@Controller('group')
export class GroupController {

  private _logger: Logger;

  constructor(
    private readonly findOneUseCase: FindByIdGroupUseCase,
    private readonly createGroup: CreateGroupUseCase,
    private readonly updateGroup: UpdateGroupUseCase,
    private readonly removeGroup: RemoveGroupUseCase,
    private readonly paginatedGroup: PaginatedGroupUseCase,
    private readonly findDetailsGroup: FindDetailsGroupUseCase) {

    this._logger = new Logger('GroupController');
  }

  @Get(':id')
  async findOne(@Param() params, @Response() res) {
    this._logger.log('Find One');

    const group = await this.findOneUseCase.execute({ id: params.id });
    return ProcessResponse.setResponse<Group>(res, group, GroupMappers.DomainToDto);
  }

  @Get('details/:id')
  async findDetails(@Param() params, @Response() res) {
    this._logger.log('Find One Details');

    const group = await this.findDetailsGroup.execute({ id: params.id });
    return ProcessResponse.setResponse<Group>(res, group, GroupMappers.DomainToDetails);
  }


  @Post()
  async getAllPaginated(@Body() body: GroupPaginatedDto, @Response() res) {
    this._logger.log('Paginated');

    const pag = await this.paginatedGroup.execute(body);
    return ProcessResponse.setResponse(res, pag, GroupMappers.PaginatedToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: GroupCreateDto, @Response() res) {

    this._logger.log('Create');

    const group = await this.createGroup.execute(body);
    return ProcessResponse.setResponse<Group>(res, group, GroupMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: GroupUpdateDto, @Response() res) {
    this._logger.log('Update');

    const group = await this.updateGroup.execute(body);
    return ProcessResponse.setResponse<Group>(res, group, GroupMappers.DomainToDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const group = await this.removeGroup.execute(body);
    return ProcessResponse.setResponse<Group>(res, group, GroupMappers.DomainToDto);
  }
}
