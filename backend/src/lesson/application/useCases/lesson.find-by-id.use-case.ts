import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Lesson } from '../../domain/entities/lesson.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { LessonRepository } from '../../infra/repositories/lesson.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdLessonUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Lesson>
    | AppError.ValidationErrorResult<Lesson>
    | AppError.ObjectNotExistResult<Lesson>,
    Result<Lesson>>;

@Injectable()
export class FindByIdLessonUseCase implements IUseCase<{ id: string }, Promise<FindByIdLessonUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly lessonRepository: LessonRepository) {
    this._logger = new Logger('FindByIdLessonUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdLessonUseCaseResponse> {
    try {
      return Optional(await this.lessonRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`Lesson with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (lesson: Lesson) =>
            right(Result.Ok(lesson)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
