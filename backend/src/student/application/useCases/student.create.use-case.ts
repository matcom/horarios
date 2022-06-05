import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Student } from '../../../student/domain/entities/student.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { StudentCreateDto } from '../../../student/application/dtos/student.create.dto';
import { StudentRepository } from '../../../student/infra/repositories/student.repository';
import { FindByIdFacultyUseCase } from '../../../faculty/application/useCases';

export type CreateStudentUseCaseResponse = Either<AppError.UnexpectedErrorResult<Student>
  | AppError.ValidationErrorResult<Student>,
  Result<Student>>;

@Injectable()
export class CreateStudentUseCase implements IUseCase<StudentCreateDto, Promise<CreateStudentUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly facultyFindById: FindByIdFacultyUseCase,
  ) {
    this._logger = new Logger('CreateStudentUseCase');
  }

  async execute(request: StudentCreateDto): Promise<CreateStudentUseCaseResponse> {
    this._logger.log('Executing...');

    const studentOrError: Result<Student> = Student.New({
      ...request,
      facultyId: request.facultyId.id,
      majorId: request.majorId.id,
    });

    if (studentOrError.isFailure)
      return left(studentOrError);

    const student: Student = studentOrError.unwrap();

    try {
      await this.studentRepository.save(student);

      return right(Result.Ok(student));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
