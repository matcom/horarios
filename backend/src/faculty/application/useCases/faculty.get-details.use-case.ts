import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Faculty } from '../../../faculty/domain/entities/faculty.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { FacultyRepository } from '../../../faculty/infra/repositories/faculty.repository';
import Optional from '../../../shared/core/Option';

export type FindDetailsFacultyUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Faculty>
    | AppError.ValidationErrorResult<Faculty>
    | AppError.ObjectNotExistResult<Faculty>,
    Result<Faculty>>;

@Injectable()
export class FindDetailsFacultyUseCase implements IUseCase<{ id: string }, Promise<FindDetailsFacultyUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly facultyRepository: FacultyRepository) {
    this._logger = new Logger('FindDetailsFacultyUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindDetailsFacultyUseCaseResponse> {
    try {
      return Optional(await this.facultyRepository.findDetails(request.id))
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
