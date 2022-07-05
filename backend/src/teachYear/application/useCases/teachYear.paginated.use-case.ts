import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { TeachYear } from '../../../teachYear/domain/entities/teachYear.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachYearPaginatedDto } from '../../../teachYear/application/dtos/teachYear.paginated.dto';
import { TeachYearRepository } from '../../../teachYear/infra/repositories/teachYear.repository';
import { PageParams } from '../../../shared/core/PaginatorParams';

export type PaginatedTeachYearUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<TeachYear>>
  | AppError.ValidationErrorResult<PaginatedFindResult<TeachYear>>,
  Result<PaginatedFindResult<TeachYear>>>;

@Injectable()
export class PaginatedTeachYearUseCase implements IUseCase<TeachYearPaginatedDto, Promise<PaginatedTeachYearUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teachYearRepository: TeachYearRepository) {
    this._logger = new Logger('PaginatedTeachYearUseCase');
  }

  async execute(request: TeachYearPaginatedDto): Promise<PaginatedTeachYearUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.teachYearRepository.getPaginated(
            pageParams,
            request.filter,
          ),
        )
      ).mapOrElse(
        // Err case
        err => left(Result.Fail(err)),
        // Ok case
        result => right(Result.Ok(result)),
      );
    } catch (err) {
      return left(Result.Fail(new AppError.UnexpectedError(err)));
    }
  }
}
