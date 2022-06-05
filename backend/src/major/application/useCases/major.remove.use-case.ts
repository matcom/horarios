import { Major } from '../../domain/entities/major.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../shared/core/Either';
import { MajorRepository } from '../../infra/repositories/major.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type RemoveMajorUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Major>
    | AppError.ValidationErrorResult<Major>
    | AppError.ObjectNotExistResult<Major>,
    Result<Major>>;

@Injectable()
export class RemoveMajorUseCase implements IUseCase<{ id: string }, Promise<RemoveMajorUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly majorRepository: MajorRepository) {
    this._logger = new Logger('RemoveMajorUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveMajorUseCaseResponse> {
    const major = Optional(await this.majorRepository.findById(request.id));

    if (major.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Major with id ${request.id} doesn't exist`)));

    try {
      await this.majorRepository.drop(major.unwrap());
      return right(Result.Ok(major.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
