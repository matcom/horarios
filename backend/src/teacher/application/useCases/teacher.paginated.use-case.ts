import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Teacher } from '../../../teacher/domain/entities/teacher.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeacherPaginatedDto } from '../../../teacher/application/dtos/teacher.paginated.dto';
import { TeacherRepository } from '../../../teacher/infra/repositories/teacher.repository';
import { PageParams } from '../../../shared/core/PaginatorParams';

export type PaginatedTeacherUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Teacher>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Teacher>>,
  Result<PaginatedFindResult<Teacher>>>;

@Injectable()
export class PaginatedTeacherUseCase implements IUseCase<TeacherPaginatedDto, Promise<PaginatedTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teacherRepository: TeacherRepository) {
    this._logger = new Logger('PaginatedTeacherUseCase');
  }

  async execute(request: TeacherPaginatedDto): Promise<PaginatedTeacherUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.teacherRepository.getPaginated(
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
