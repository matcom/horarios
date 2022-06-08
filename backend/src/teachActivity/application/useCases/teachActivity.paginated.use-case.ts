import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { TeachActivity } from '../../../teachActivity/domain/entities/teachActivity.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachActivityPaginatedDto } from '../../../teachActivity/application/dtos/teachActivity.paginated.dto';
import { TeachActivityRepository } from '../../../teachActivity/infra/repositories/teachActivity.repository';
import { PageParams } from '../../../shared/core/PaginatorParams';

export type PaginatedTeachActivityUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<TeachActivity>>
  | AppError.ValidationErrorResult<PaginatedFindResult<TeachActivity>>,
  Result<PaginatedFindResult<TeachActivity>>>;

@Injectable()
export class PaginatedTeachActivityUseCase implements IUseCase<TeachActivityPaginatedDto, Promise<PaginatedTeachActivityUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teachActivityRepository: TeachActivityRepository) {
    this._logger = new Logger('PaginatedTeachActivityUseCase');
  }

  async execute(request: TeachActivityPaginatedDto): Promise<PaginatedTeachActivityUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.teachActivityRepository.getPaginated(
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
