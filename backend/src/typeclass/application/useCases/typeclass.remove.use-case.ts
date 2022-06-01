import { TypeClass } from '../../domain/entities/typeclass.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../shared/core/Either';
import { TypeclassRepository } from '../../infra/repositories/typeclass.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type RemoveTypeClassUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TypeClass>
    | AppError.ValidationErrorResult<TypeClass>
    | AppError.ObjectNotExistResult<TypeClass>,
    Result<TypeClass>>;

@Injectable()
export class RemoveTypeClassUseCase implements IUseCase<{ id: string }, Promise<RemoveTypeClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly typeclassRepository: TypeclassRepository) {
    this._logger = new Logger('RemoveFacultyUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveTypeClassUseCaseResponse> {
    const typeclass = Optional(await this.typeclassRepository.findById(request.id));

    if (typeclass.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`TypeClass with id ${request.id} doesn't exist`)));

    try {
      await this.typeclassRepository.drop(typeclass.unwrap());
      return right(Result.Ok(typeclass.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
