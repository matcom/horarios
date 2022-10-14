import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Class } from '../../../class/domain/entities/class.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { ClassUpdateDto } from '../../../class/application/dtos/class.update.dto';
import { ClassRepository } from '../../../class/infra/repositories/class.repository';
import Optional from '../../../shared/core/Option';

export type UpdateClassUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Class>
    | AppError.ValidationErrorResult<Class>
    | AppError.ObjectNotExistResult<Class>,
    Result<Class>>;

@Injectable()
export class UpdateClassUseCase implements IUseCase<ClassUpdateDto, Promise<UpdateClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly classRepository: ClassRepository) {
    this._logger = new Logger('UpdateClassUseCase');
  }

  async execute(request: ClassUpdateDto): Promise<UpdateClassUseCaseResponse> {
    this._logger.log('Executing');

    console.log(request);

    const toUpdate = Optional(await this.classRepository.findById(request.classId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Class with id ${request.classId} doesn't exist`)));

    let forUpdate: Class = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.classRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
