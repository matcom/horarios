import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Teacher } from '../../../teacher/domain/entities/teacher.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeacherRepository } from '../../../teacher/infra/repositories/teacher.repository';
import Optional from '../../../shared/core/Option';

export type RemoveTeacherUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Teacher>
    | AppError.ValidationErrorResult<Teacher>
    | AppError.ObjectNotExistResult<Teacher>,
    Result<Teacher>>;

@Injectable()
export class RemoveTeacherUseCase implements IUseCase<{ id: string }, Promise<RemoveTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teacherRepository: TeacherRepository) {
    this._logger = new Logger('RemoveTeacherUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveTeacherUseCaseResponse> {
    const teacher = Optional(await this.teacherRepository.findById(request.id));

    if (teacher.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Teacher with id ${request.id} doesn't exist`)));

    try {
      await this.teacherRepository.drop(teacher.unwrap());
      return right(Result.Ok(teacher.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
