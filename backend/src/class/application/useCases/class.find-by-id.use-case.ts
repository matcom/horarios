import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Class } from '../../../class/domain/entities/class.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { ClassRepository } from '../../../class/infra/repositories/class.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdClassUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Class>
    | AppError.ValidationErrorResult<Class>
    | AppError.ObjectNotExistResult<Class>,
    Result<Class>>;

@Injectable()
export class FindByIdClassUseCase implements IUseCase<{ id: string }, Promise<FindByIdClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly classRepository: ClassRepository) {
    this._logger = new Logger('FindByIdClassUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdClassUseCaseResponse> {
    try {
      return Optional(await this.classRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`Class with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (c: Class) =>
            right(Result.Ok(c)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
