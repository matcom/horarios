import { Faculty } from '../../domain/entities/faculty.entity';
import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { FacultyRepository } from '../../infra/repositories/faculty.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type FindByIdFacultyUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Faculty>
    | AppError.ValidationErrorResult<Faculty>
    | AppError.ObjectNotExistResult<Faculty>,
    Result<Faculty>>;

@Injectable()
export class FindByIdFacultyUseCase implements IUseCase<{ id: string }, Promise<FindByIdFacultyUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly facultyRepository: FacultyRepository) {
    this._logger = new Logger('FindByIdFacultyUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdFacultyUseCaseResponse> {
    try {
      return Optional(await this.facultyRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`Faculty with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (faculty: Faculty) =>
            right(Result.Ok(faculty)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
