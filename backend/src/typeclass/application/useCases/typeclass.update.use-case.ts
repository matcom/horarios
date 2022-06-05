import { TypeClass } from '../../domain/entities/typeclass.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../shared/core/Either';
import { TypeclassUpdateDto } from '../dtos/typeclass.update.dto';
import { TypeclassRepository } from '../../infra/repositories/typeclass.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type UpdateFacultyUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TypeClass>
    | AppError.ValidationErrorResult<TypeClass>
    | AppError.ObjectNotExistResult<TypeClass>,
    Result<TypeClass>>;

@Injectable()
export class UpdateTypeClassUseCase implements IUseCase<TypeclassUpdateDto, Promise<UpdateFacultyUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly typeclassRepository: TypeclassRepository) {
    this._logger = new Logger('UpdateTypeClassUseCase');
  }

  async execute(request: TypeclassUpdateDto): Promise<UpdateFacultyUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.typeclassRepository.findById(request.typeclassId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`TypeClass with id ${request.typeclassId} doesn't exist`)));

    const forUpdate: TypeClass = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.typeclassRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
