import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Lesson } from '../../domain/entities/lesson.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { LessonRepository } from '../../infra/repositories/lesson.repository';
import Optional from '../../../shared/core/Option';
import { LessonUpdateDto } from '../dtos/lesson.update.dto';

export type UpdateLessonUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Lesson>
    | AppError.ValidationErrorResult<Lesson>
    | AppError.ObjectNotExistResult<Lesson>,
    Result<Lesson>>;

@Injectable()
export class UpdateLessonUseCase implements IUseCase<LessonUpdateDto, Promise<UpdateLessonUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly lessonRepository: LessonRepository) {
    this._logger = new Logger('UpdateLessonUseCase');
  }

  async execute(request: LessonUpdateDto): Promise<UpdateLessonUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.lessonRepository.findById(request.lessonId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Lesson with id ${request.lessonId} doesn't exist`)));

    let forUpdate: Lesson = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.lessonRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
