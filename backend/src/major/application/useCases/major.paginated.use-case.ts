import { Major } from '../../domain/entities/major.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { PageParams } from '../../../shared/core/PaginatorParams';
import { MajorRepository } from '../../infra/repositories/major.repository';
import { Either, left, right } from '../../../shared/core/Either';
import { Result } from '../../../shared/core/Result';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { MajorPaginatedDto } from '../dtos/major.paginated.dto';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';

export type PaginatedMajorUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Major>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Major>>,
  Result<PaginatedFindResult<Major>>>;

@Injectable()
export class PaginatedMajorUseCase implements IUseCase<MajorPaginatedDto, Promise<PaginatedMajorUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly majorRepository: MajorRepository) {
    this._logger = new Logger('PaginatedMajorUseCase');
  }

  async execute(request: MajorPaginatedDto): Promise<PaginatedMajorUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.majorRepository.getPaginated(
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
