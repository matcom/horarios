import { Local } from '../../domain/entities/local.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { PageParams } from '../../../shared/core/PaginatorParams';
import { LocalRepository } from '../../infra/repositories/local.repository';
import { Either, left, right } from '../../../shared/core/Either';
import { Result } from '../../../shared/core/Result';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { LocalPaginatedDto } from '../dtos/local.paginated.dto';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';

export type PaginatedLocalUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Local>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Local>>,
  Result<PaginatedFindResult<Local>>>;

@Injectable()
export class PaginatedLocalUseCase implements IUseCase<LocalPaginatedDto, Promise<PaginatedLocalUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly facultyRepository: LocalRepository) {
    this._logger = new Logger('PaginatedLocalUseCase');
  }

  async execute(request: LocalPaginatedDto): Promise<PaginatedLocalUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.facultyRepository.getPaginated(
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
