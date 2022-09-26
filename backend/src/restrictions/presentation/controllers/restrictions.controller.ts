import { Body, Controller, Get, Logger, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import {
  BuildWhereUseCase,
  CreateCountConditionsRestrictionsUseCase,
  CreateCountRestrictionUseCase,
  EvaluateCountConditionsRestrictionsUseCase,
  EvaluateCountRestrictionUseCase,
} from '../../application/useCases';
import { CountRestrictionsMappers } from '../../infra/mappers/count-restrictions.mappers';
import { JwtAuthGuard } from '../../../auth/application/guards/jwtAuthGuard';
import { CountRestrictionsCreateDto } from '../../application/dtos/count-restrictions/count-restrictions.create.dto';
import {
  CountConditionsRestrictionsCreateDto,
} from '../../application/dtos/count-conditions-restrictions/count-conditions.create.dto';
import { CountConditionsRestrictionsMappers } from '../../infra/mappers/count-conditions.restrictions.mappers';

@Controller('restrictions')
export class RestrictionsController {

  private _logger: Logger;

  constructor(
    private readonly buildWhere: BuildWhereUseCase,
    private readonly createSimpleCountUseCase: CreateCountRestrictionUseCase,
    private readonly evaluateSimpleCountRestrictions: EvaluateCountRestrictionUseCase,
    private readonly createCountConditionsRestrictionUseCase: CreateCountConditionsRestrictionsUseCase,
    private readonly evaluateCountConditionsRestrictionsUseCase: EvaluateCountConditionsRestrictionsUseCase,
  ) {
    this._logger = new Logger('RestrictionsController');
  }

  // @UseGuards(JwtAuthGuard)
  @Get('evaluate/simple_count_restrictions')
  async simpleConditions(@Request() req, @Response() res) {
    this._logger.log('EvaluateSimpleCountRestrictions');

    let count = await this.evaluateSimpleCountRestrictions.execute({});

    return ProcessResponse.setResponse(res, count);
  }

  @Get('evaluate/count_conditions_restrictions')
  async conditionsRestrictions(@Request() req, @Response() res) {
    this._logger.log('EvaluateCountConditionsRestrictions');

    let count = await this.evaluateCountConditionsRestrictionsUseCase.execute({});

    return ProcessResponse.setResponse(res, count);
  }

  @UseGuards(JwtAuthGuard)
  // @PermissionsDecorator(UserPermissions.HANDLE_WEEK)
  @Post('create/simple_count_restriction')
  async createSimpleCountRestrictions(@Body() body: CountRestrictionsCreateDto, @Request() req, @Response() res) {

    this._logger.log('CreateSimpleCountRestrictions');

    const cr = await this.createSimpleCountUseCase.execute({
      ...body,
      teacherId: { id: req.user.props.id },
    });
    return ProcessResponse.setResponse(res, cr, CountRestrictionsMappers.DomainToDto);
  }


  @UseGuards(JwtAuthGuard)
  // @PermissionsDecorator(UserPermissions.HANDLE_WEEK)
  @Post('create/count_conditions_restriction')
  async createCountConditionRestrictions(@Body() body: CountConditionsRestrictionsCreateDto, @Request() req, @Response() res) {

    this._logger.log('CreateCountConditionRestrictions');

    const cr = await this.createCountConditionsRestrictionUseCase.execute({
      ...body,
      teacherId: { id: req.user.props.id },
    });
    return ProcessResponse.setResponse(res, cr, CountConditionsRestrictionsMappers.DomainToDto);
  }
}