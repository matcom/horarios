import { TypeClass } from '../../domain/entities/typeclass.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { PageParams } from '../../../shared/core/PaginatorParams';
import { TypeclassRepository } from '../../infra/repositories/typeclass.repository';
import { Either, left, right } from '../../../shared/core/Either';
import { Result } from '../../../shared/core/Result';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { TypeclassPaginatedDto } from '../dtos/typeclass.paginated.dto';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';

export type PaginatedLocalUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<TypeClass>>
  | AppError.ValidationErrorResult<PaginatedFindResult<TypeClass>>,
  Result<PaginatedFindResult<TypeClass>>>;

@Injectable()
export class TypeClassPaginatedUseCase implements IUseCase<TypeclassPaginatedDto, Promise<PaginatedLocalUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly typeclassRepository: TypeclassRepository) {
    this._logger = new Logger('TypeClassLocalUseCase');
  }

  async execute(request: TypeclassPaginatedDto): Promise<PaginatedLocalUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.typeclassRepository.getPaginated(
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
