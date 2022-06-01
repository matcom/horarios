import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Teacher } from '../../../teacher/domain/entities/teacher.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeacherUpdateDto } from '../../../teacher/application/dtos/teacher.update.dto';
import { TeacherRepository } from '../../../teacher/infra/repositories/teacher.repository';
import Optional from '../../../shared/core/Option';

export type UpdateTeacherUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Teacher>
    | AppError.ValidationErrorResult<Teacher>
    | AppError.ObjectNotExistResult<Teacher>,
    Result<Teacher>>;

@Injectable()
export class UpdateTeacherUseCase implements IUseCase<TeacherUpdateDto, Promise<UpdateTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teacherRepository: TeacherRepository) {
    this._logger = new Logger('UpdateTeacherUseCase');
  }

  async execute(request: TeacherUpdateDto): Promise<UpdateTeacherUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.teacherRepository.findById(request.teacherId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Teacher with id ${request.teacherId} doesn't exist`)));

    let forUpdate: Teacher = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.teacherRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
