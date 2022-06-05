import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { PageParams } from '../../../shared/core/PaginatorParams';
import { CatTeacher } from '../../domain/entities/catTeacher.entity';
import { CatTeacherPaginatedDto } from '../dtos/catTeacher.paginated.dto';
import { CatTeacherRepository } from '../../infra/repositories/catTeacher.repository';

export type PaginatedCatTeacherUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<CatTeacher>>
  | AppError.ValidationErrorResult<PaginatedFindResult<CatTeacher>>,
  Result<PaginatedFindResult<CatTeacher>>>;

@Injectable()
export class PaginatedCatTeacherUseCase implements IUseCase<CatTeacherPaginatedDto, Promise<PaginatedCatTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly catTeacherRepository: CatTeacherRepository) {
    this._logger = new Logger('PaginatedCatTeacherUseCase');
  }

  async execute(request: CatTeacherPaginatedDto): Promise<PaginatedCatTeacherUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.catTeacherRepository.getPaginated(
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
