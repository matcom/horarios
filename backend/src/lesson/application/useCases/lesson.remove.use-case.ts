import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Lesson } from '../../domain/entities/lesson.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { LessonRepository } from '../../infra/repositories/lesson.repository';
import Optional from '../../../shared/core/Option';

export type RemoveLessonUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Lesson>
    | AppError.ValidationErrorResult<Lesson>
    | AppError.ObjectNotExistResult<Lesson>,
    Result<Lesson>>;

@Injectable()
export class RemoveLessonUseCase implements IUseCase<{ id: string }, Promise<RemoveLessonUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly lessonRepository: LessonRepository) {
    this._logger = new Logger('RemoveLessonUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveLessonUseCaseResponse> {
    const lesson = Optional(await this.lessonRepository.findById(request.id));

    if (lesson.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Lesson with id ${request.id} doesn't exist`)));

    try {
      await this.lessonRepository.drop(lesson.unwrap());
      return right(Result.Ok(lesson.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
