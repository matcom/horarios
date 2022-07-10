import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Class } from '../../../class/domain/entities/class.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { ClassPaginatedDto } from '../../../class/application/dtos/class.paginated.dto';
import { ClassRepository } from '../../../class/infra/repositories/class.repository';
import { PageParams } from '../../../shared/core/PaginatorParams';

export type PaginatedClassUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Class>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Class>>,
  Result<PaginatedFindResult<Class>>>;

@Injectable()
export class PaginatedClassUseCase implements IUseCase<ClassPaginatedDto, Promise<PaginatedClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly classRepository: ClassRepository) {
    this._logger = new Logger('PaginatedClassUseCase');
  }

  async execute(request: ClassPaginatedDto): Promise<PaginatedClassUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.classRepository.getPaginated(
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
