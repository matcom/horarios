import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Lesson } from '../../domain/entities/lesson.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { LessonRepository } from '../../infra/repositories/lesson.repository';
import { PageParams } from '../../../shared/core/PaginatorParams';
import { LessonPaginatedDto } from '../dtos/lesson.paginated.dto';

export type PaginatedLessonUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Lesson>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Lesson>>,
  Result<PaginatedFindResult<Lesson>>>;

@Injectable()
export class PaginatedLessonUseCase implements IUseCase<LessonPaginatedDto, Promise<PaginatedLessonUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly lessonRepository: LessonRepository) {
    this._logger = new Logger('PaginatedLessonUseCase');
  }

  async execute(request: LessonPaginatedDto): Promise<PaginatedLessonUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.lessonRepository.getPaginated(
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
