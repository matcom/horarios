import { TypeClass } from '../../domain/entities/typeclass.entity';
import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { TypeclassRepository } from '../../infra/repositories/typeclass.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type FindByIdTypeClassUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TypeClass>
    | AppError.ValidationErrorResult<TypeClass>
    | AppError.ObjectNotExistResult<TypeClass>,
    Result<TypeClass>>;

@Injectable()
export class FindByIdTypeClassUseCase implements IUseCase<{ id: string }, Promise<FindByIdTypeClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly typeclassRepository: TypeclassRepository) {
    this._logger = new Logger('FindByIdTypeClassUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdTypeClassUseCaseResponse> {
    try {
      return Optional(await this.typeclassRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`TypeClass with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (local: TypeClass) =>
            right(Result.Ok(local)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
