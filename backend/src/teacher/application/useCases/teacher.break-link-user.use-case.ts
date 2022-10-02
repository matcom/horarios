import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { TeacherRepository } from '../../../teacher/infra/repositories/teacher.repository';
import { Teacher } from '../../../teacher/domain/entities/teacher.entity';

export type TeacherBreackUserLinkUseCaseResponse = Either<AppError.UnexpectedErrorResult<Teacher>
  | AppError.ValidationErrorResult<Teacher>,
  Result<Teacher>>;

@Injectable()
export class TeacherBreakUserLinkUseCase implements IUseCase<{ teacherId: string }, Promise<TeacherBreackUserLinkUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly teacherRepository: TeacherRepository,
  ) {
    this._logger = new Logger('SetUserAsTeacherUseCase');
  }

  async execute(request: { teacherId: string }): Promise<TeacherBreackUserLinkUseCaseResponse> {

    this._logger.log('Executing...');

    console.log(request);

    const teacher: Teacher = await this.teacherRepository.findById(request.teacherId);

    if (teacher === null)
      return left(Result.Fail(new AppError.ValidationError('Teacher not found')));

    teacher.SetUser({ id: null });
    await this.teacherRepository.save(teacher);

    return right(Result.Ok(teacher));
  }
}
