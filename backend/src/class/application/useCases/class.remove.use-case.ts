import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Class } from '../../../class/domain/entities/class.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { ClassRepository } from '../../../class/infra/repositories/class.repository';
import Optional from '../../../shared/core/Option';

export type RemoveClassUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Class>
    | AppError.ValidationErrorResult<Class>
    | AppError.ObjectNotExistResult<Class>,
    Result<Class>>;

@Injectable()
export class RemoveClassUseCase implements IUseCase<{ id: string }, Promise<RemoveClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly classRepository: ClassRepository) {
    this._logger = new Logger('RemoveClassUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveClassUseCaseResponse> {
    const c = Optional(await this.classRepository.findById(request.id));

    if (c.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Class with id ${request.id} doesn't exist`)));

    try {
      await this.classRepository.drop(c.unwrap());
      return right(Result.Ok(c.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
