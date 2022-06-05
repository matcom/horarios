import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Student } from '../../../student/domain/entities/student.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { StudentPaginatedDto } from '../../../student/application/dtos/student.paginated.dto';
import { StudentRepository } from '../../../student/infra/repositories/student.repository';
import { PageParams } from '../../../shared/core/PaginatorParams';

export type PaginatedStudentUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Student>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Student>>,
  Result<PaginatedFindResult<Student>>>;

@Injectable()
export class PaginatedStudentUseCase implements IUseCase<StudentPaginatedDto, Promise<PaginatedStudentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly studentRepository: StudentRepository) {
    this._logger = new Logger('PaginatedStudentUseCase');
  }

  async execute(request: StudentPaginatedDto): Promise<PaginatedStudentUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.studentRepository.getPaginated(
            pageParams,
            request.filter,
          ),
        )
      ).mapOrElse(
        // Err case
        err => left(Result.Fail(err)),
        // Ok case
        result => right(Result.Ok(result)),
      );
    } catch (err) {
      return left(Result.Fail(new AppError.UnexpectedError(err)));
    }
  }
}
