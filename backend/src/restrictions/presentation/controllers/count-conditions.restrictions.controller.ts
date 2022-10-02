import { Body, Controller, Delete, Get, Logger, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import {
  BuildWhereUseCase,
  CreateCountConditionsRestrictionsUseCase,
  EvaluateCountConditionsRestrictionsUseCase,
  FindAllCountConditionsRestrictionsUseCase,
  RemoveCountConditionsRestrictionsUseCase,
} from '../../application/useCases';
import { JwtAuthGuard } from '../../../auth/application/guards/jwtAuthGuard';
import {
  CountConditionsRestrictionsCreateDto,
} from '../../application/dtos/count-conditions-restrictions/count-conditions.create.dto';
import { CountConditionsRestrictionsMappers } from '../../infra/mappers/count-conditions.restrictions.mappers';
import {
  CountConditionsRestrictionsFindAllDto,
} from '../../application/dtos/count-conditions-restrictions/count-conditions.restrictions.find-all.dto';

@Controller('restrictions/count_conditions_restrictions')
export class CountConditionsRestrictionsController {

  private _logger: Logger;

  constructor(
    private readonly buildWhere: BuildWhereUseCase,
    private readonly create: CreateCountConditionsRestrictionsUseCase,
    private readonly evaluate: EvaluateCountConditionsRestrictionsUseCase,
    private readonly findAll: FindAllCountConditionsRestrictionsUseCase,
    private readonly remove: RemoveCountConditionsRestrictionsUseCase,
  ) {
    this._logger = new Logger('CountConditionsRestrictionsController');
  }

  @Get('evaluate')
  async conditionsRestrictions(@Request() req, @Response() res) {
    this._logger.log('Evaluate');

    let count = await this.evaluate.execute({ teacherId: req.user.props.id });

    return ProcessResponse.setResponse(res, count);
  }

  @UseGuards(JwtAuthGuard)
  // @PermissionsDecorator(UserPermissions.HANDLE_WEEK)
  @Post('create')
  async createCountConditionRestrictions(@Body() body: CountConditionsRestrictionsCreateDto, @Request() req, @Response() res) {

    this._logger.log('Create');

    const cr = await this.create.execute({
      ...body,
      teacherId: { id: req.user.props.id },
    });
    return ProcessResponse.setResponse(res, cr, CountConditionsRestrictionsMappers.DomainToDto);
  }

  @Post('all')
  async getAll(@Body() body: CountConditionsRestrictionsFindAllDto, @Response() res) {
    this._logger.log('Get All');

    const ans = await this.findAll.execute(body);
    return ProcessResponse.setResponse(res, ans, CountConditionsRestrictionsMappers.AllToDto);
  }

  @UseGuards(JwtAuthGuard)
  // @PermissionsDecorator(UserPermissions.HANDLE_STUDENT)
  @Delete()
  async delete(@Body() body: { id: string }, @Response() res) {
    this._logger.log('Delete');

    const rest = await this.remove.execute(body);
    return ProcessResponse.setResponse(res, rest, CountConditionsRestrictionsMappers.DomainToDto);
  }
}
