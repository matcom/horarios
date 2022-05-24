import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeacherCreateDto } from '../dtos/teacher.create.dto';
import { Teacher } from 'src/teacher/domain/entities/teacher.entity';
import { TeacherRepository } from '../../infra/repositories/teacher.repository';
import { TeacherFacultyRepository } from '../../../teacherFaculty/infra/repositories/teacherFaculty.repository';

export type CreateTeacherUseCaseResponse = Either<AppError.UnexpectedErrorResult<Teacher>
  | AppError.ValidationErrorResult<Teacher>,
  Result<Teacher>>;

@Injectable()
export class CreateTeacherUseCase implements IUseCase<TeacherCreateDto, Promise<CreateTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly facultyRepository: TeacherRepository,
              private readonly teacherFacultyRepository: TeacherFacultyRepository) {
    this._logger = new Logger('CreateTeacherUseCase');
  }

  async execute(request: TeacherCreateDto): Promise<CreateTeacherUseCaseResponse> {
    this._logger.log('Executing...');

    const teacherOrError: Result<Teacher> = Teacher.New({ ...request });

    if (teacherOrError.isFailure)
      return left(teacherOrError);

    const teacher: Teacher = teacherOrError.unwrap();

    try {
      await this.facultyRepository.save(teacher);

      // const teacherFacultyEntries: TeacherFaculty[] = [];
      //
      // teacher.facultyIds.forEach(e => {
      //   teacherFacultyEntries.push(TeacherFaculty.New({
      //     teacherId: teacher._id.toString(),
      //     facultyId: e,
      //   }).unwrap());
      // });
      // await this.teacherFacultyRepository.saveMany(teacherFacultyEntries);

      return right(Result.Ok(teacher));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
