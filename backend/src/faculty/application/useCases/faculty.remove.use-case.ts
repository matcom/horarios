import { Faculty } from '../../domain/entities/faculty.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../shared/core/Either';
import { FacultyRepository } from '../../infra/repositories/faculty.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type RemoveFacultyUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Faculty>
    | AppError.ValidationErrorResult<Faculty>
    | AppError.ObjectNotExistResult<Faculty>,
    Result<Faculty>>;

@Injectable()
export class RemoveFacultyUseCase implements IUseCase<{ id: string }, Promise<RemoveFacultyUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly facultyRepository: FacultyRepository) {
    this._logger = new Logger('RemoveFacultyUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveFacultyUseCaseResponse> {
    const faculty = Optional(await this.facultyRepository.findById(request.id));

    if (faculty.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Faculty with id ${request.id} doesn't exist`)));

    try {
      await this.facultyRepository.drop(faculty.unwrap());
      return right(Result.Ok(faculty.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
