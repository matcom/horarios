import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { TeachYear } from '../../../teachYear/domain/entities/teachYear.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachYearRepository } from '../../../teachYear/infra/repositories/teachYear.repository';
import Optional from '../../../shared/core/Option';

export type RemoveTeachYearUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TeachYear>
    | AppError.ValidationErrorResult<TeachYear>
    | AppError.ObjectNotExistResult<TeachYear>,
    Result<TeachYear>>;

@Injectable()
export class RemoveTeachYearUseCase implements IUseCase<{ id: string }, Promise<RemoveTeachYearUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teachYearRepository: TeachYearRepository) {
    this._logger = new Logger('RemoveTeachYearUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveTeachYearUseCaseResponse> {
    const teachYear = Optional(await this.teachYearRepository.findById(request.id));

    if (teachYear.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`TeachYear with id ${request.id} doesn't exist`)));

    try {
      await this.teachYearRepository.drop(teachYear.unwrap());
      return right(Result.Ok(teachYear.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
