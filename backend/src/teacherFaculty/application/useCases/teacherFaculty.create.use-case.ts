import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { TeacherFaculty } from '../../domain/entities/teacherFaculty.entity';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeacherFacultyCreateDto } from '../dto/teacherFacultyCreateDto';
import { TeacherFacultyRepository } from '../../infra/repositories/teacherFaculty.repository';

export type CreateTeacherFacultyUseCaseResponse = Either<AppError.UnexpectedErrorResult<TeacherFaculty>
  | AppError.ValidationErrorResult<TeacherFaculty>,
  Result<TeacherFaculty>>;


@Injectable()
export class CreateTeacherFacultyUseCase implements IUseCase<TeacherFacultyCreateDto, Promise<CreateTeacherFacultyUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teacherFacultyRepository: TeacherFacultyRepository) {
    this._logger = new Logger('CreateFacultyUseCase');
  }

  async execute(request: TeacherFacultyCreateDto): Promise<CreateTeacherFacultyUseCaseResponse> {
    this._logger.log('Executing...');

    const teacherFacultyOrError: Result<TeacherFaculty> = TeacherFaculty.New({ ...request });

    if (teacherFacultyOrError.isFailure)
      return left(teacherFacultyOrError);

    const teacherFaculty: TeacherFaculty = teacherFacultyOrError.unwrap();

    try {
      await this.teacherFacultyRepository.save(teacherFaculty);
      return right(Result.Ok(teacherFaculty));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }

  }
}
