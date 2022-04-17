import { Faculty } from '../../domain/entities/faculty.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { PageParams } from '../../../shared/core/PaginatorParams';
import { FacultyRepository } from '../../infra/repositories/faculty.repository';
import { Either, left, right } from '../../../shared/core/Either';
import { Result } from '../../../shared/core/Result';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { FacultyPaginatedDto } from '../dtos/faculty.paginated.dto';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';

export type PaginatedFacultyUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Faculty>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Faculty>>,
  Result<PaginatedFindResult<Faculty>>>;

@Injectable()
export class PaginatedFacultyUseCase implements IUseCase<FacultyPaginatedDto, Promise<PaginatedFacultyUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly facultyRepository: FacultyRepository) {
    this._logger = new Logger('PaginatedFacultyUseCase');
  }

  async execute(request: FacultyPaginatedDto): Promise<PaginatedFacultyUseCaseResponse> {
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
