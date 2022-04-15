import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { University } from '../../domain/entities/university.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { UniversityRepository } from '../../infra/repositories/university.repository';
import Optional from '../../../shared/core/Option';

export type RemoveUniversityUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<University>
    | AppError.ValidationErrorResult<University>
    | AppError.ObjectNotExistResult<University>,
    Result<University>>;

@Injectable()
export class RemoveUniversityUseCase implements IUseCase<{ id: string }, Promise<RemoveUniversityUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly universityRepository: UniversityRepository) {
    this._logger = new Logger('RemoveUniversityUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveUniversityUseCaseResponse> {
    const university = Optional(await this.universityRepository.findById(request.id));

    if (university.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`University with id ${request.id} doesn't exist`)));

    try {
      await this.universityRepository.drop(university.unwrap());
      return right(Result.Ok(university.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
