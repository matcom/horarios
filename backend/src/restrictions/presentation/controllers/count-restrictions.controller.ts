import { Body, Controller, Get, Logger, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ProcessResponse } from '../../../shared/core/utils/processResponse';
import {
  BuildWhereUseCase,
  CreateCountRestrictionUseCase,
  EvaluateCountRestrictionUseCase,
} from '../../application/useCases';
import { CountRestrictions } from '../../domain/entities/count-restriction.entity';
import { CountRestrictionsMappers } from '../../infra/mappers/count-restrictions.mappers';
import { JwtAuthGuard } from '../../../auth/application/guards/jwtAuthGuard';
import { CountRestrictionsCreateDto } from '../../application/dtos/count-restrictions/count-restrictions.create.dto';

@Controller('countrestrictions')
export class CountRestrictionsController {

  private _logger: Logger;

  constructor(
    private readonly createUseCase: CreateCountRestrictionUseCase,
    private readonly buildWhere: BuildWhereUseCase,
    private readonly countRestrictions: EvaluateCountRestrictionUseCase,
  ) {
    this._logger = new Logger('CountRestrictionsController');
  }

  // @UseGuards(JwtAuthGuard)
  @Get('count')
  async count(@Request() req, @Response() res) {
    this._logger.log('Count');

    let count = await this.countRestrictions.execute({});

    return ProcessResponse.setResponse(res, count);
  }

  @UseGuards(JwtAuthGuard)
  // @PermissionsDecorator(UserPermissions.HANDLE_WEEK)
  @Post('create')
  async create(@Body() body: CountRestrictionsCreateDto, @Request() req, @Response() res) {

    this._logger.log('Create');

    const cr = await this.createUseCase.execute({
      ...body,
      teacherId: { id: req.user.props.id },
    });
    return ProcessResponse.setResponse<CountRestrictions>(res, cr, CountRestrictionsMappers.DomainToDto);
  }
}