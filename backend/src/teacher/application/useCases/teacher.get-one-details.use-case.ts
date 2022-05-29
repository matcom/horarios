import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Teacher } from '../../domain/entities/teacher.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeacherRepository } from '../../infra/repositories/teacher.repository';
import Optional from '../../../shared/core/Option';

export type FindDetailsTeacherUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Teacher>
    | AppError.ValidationErrorResult<Teacher>
    | AppError.ObjectNotExistResult<Teacher>,
    Result<Teacher>>;

@Injectable()
export class FindDetailsTeacherUseCase implements IUseCase<{ id: string }, Promise<FindDetailsTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teacherRepository: TeacherRepository) {
    this._logger = new Logger('FindDetailsTeacherUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindDetailsTeacherUseCaseResponse> {
    try {
      return Optional(await this.teacherRepository.findDetails(request.id))
        .okOr(new AppError.ObjectNotExist(`Teacher with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (teacher: Teacher) =>
            right(Result.Ok(teacher)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
