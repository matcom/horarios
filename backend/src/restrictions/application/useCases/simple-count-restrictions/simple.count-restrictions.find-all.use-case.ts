import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../../shared/core/Either';
import { FindAllResult } from '../../../../shared/core/FindAllResult';
import { AppError } from '../../../../shared/core/errors/AppError';
import { SimpleCountRestrictions } from '../../../domain/entities/simple-count-restriction.entity';
import { Result } from '../../../../shared/core/Result';
import { IUseCase } from '../../../../shared/core/interfaces/IUseCase';
import { SimpleCountRestrictionsFindAllDto } from '../../dtos/count-restrictions/count-restriction.find-all.dto';
import {
  SimpleCountRestrictionsRepository,
} from '../../../infra/repositories/simple-count-restrictions-repository.service';

export type FindAllSimpleCountRestrictionsUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<FindAllResult<SimpleCountRestrictions>>
    | AppError.ValidationErrorResult<FindAllResult<SimpleCountRestrictions>>
    | AppError.ObjectNotExistResult<FindAllResult<SimpleCountRestrictions>>,
    Result<FindAllResult<SimpleCountRestrictions>>>;

@Injectable()
export class FindAllSimpleCountRestrictionsUseCase implements IUseCase<SimpleCountRestrictionsFindAllDto, Promise<FindAllSimpleCountRestrictionsUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly simpleCountRestrictionsRepository: SimpleCountRestrictionsRepository) {
    this._logger = new Logger('FindAllSimpleCountRestrictionsUseCase');
  }

  async execute(request: SimpleCountRestrictionsFindAllDto): Promise<FindAllSimpleCountRestrictionsUseCaseResponse> {
    try {
      const ans = await this.simpleCountRestrictionsRepository.findAll(request.filter);
      return right(Result.Ok(ans));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
