import { Body, Controller, Delete, Get, Logger, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import {
  BuildWhereUseCase,
  CreateSimpleCountRestrictionUseCase,
  EvaluateSimpleCountRestrictionUseCase,
  FindAllSimpleCountRestrictionsUseCase,
  RemoveSimpleCountRestrictionsUseCase,
} from '../../application/useCases';
import { SimpleCountRestrictionsMappers } from '../../infra/mappers/simple-count-restrictions.mappers';
import { JwtAuthGuard } from '../../../auth/application/guards/jwtAuthGuard';
import { CountRestrictionsCreateDto } from '../../application/dtos/count-restrictions/count-restrictions.create.dto';
import {
  SimpleCountRestrictionsFindAllDto,
} from '../../application/dtos/count-restrictions/count-restriction.find-all.dto';

@Controller('restrictions/simple_count_restrictions')
export class SimpleRestrictionsController {

  private _logger: Logger;

  constructor(
    private readonly buildWhere: BuildWhereUseCase,
    private readonly create: CreateSimpleCountRestrictionUseCase,
    private readonly evaluate: EvaluateSimpleCountRestrictionUseCase,
    private readonly remove: RemoveSimpleCountRestrictionsUseCase,
    private readonly findAll: FindAllSimpleCountRestrictionsUseCase,
  ) {
    this._logger = new Logger('SimpleRestrictionsController');
  }

  // @UseGuards(JwtAuthGuard)
  @Get('evaluate')
  async simpleConditions(@Request() req, @Response() res) {
    this._logger.log('EvaluateSimpleCountRestrictions');

    let count = await this.evaluate.execute({ teacherId: req.user.props.id });

    return ProcessResponse.setResponse(res, count);
  }

  @UseGuards(JwtAuthGuard)
  // @PermissionsDecorator(UserPermissions.HANDLE_WEEK)
  @Post('create')
  async createSimpleCountRestrictions(@Body() body: CountRestrictionsCreateDto, @Request() req, @Response() res) {

    this._logger.log('Create');

    const cr = await this.create.execute({
      ...body,
      teacherId: { id: req.user.props.id },
    });
    return ProcessResponse.setResponse(res, cr, SimpleCountRestrictionsMappers.DomainToDto);
  }

  @Post('all')
  async getAll(@Body() body: SimpleCountRestrictionsFindAllDto, @Response() res) {
    this._logger.log('Get All');

    const ans = await this.findAll.execute(body);
    return ProcessResponse.setResponse(res, ans, SimpleCountRestrictionsMappers.AllToDto);
  }

  @UseGuards(JwtAuthGuard)
  // @PermissionsDecorator(UserPermissions.HANDLE_STUDENT)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const rest = await this.remove.execute(body);
    return ProcessResponse.setResponse(res, rest, SimpleCountRestrictionsMappers.DomainToDto);
  }
}