import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { ClassCreateDto } from '../dtos/class.create.dto';
import { ClassRepository } from '../../infra/repositories/class.repository';
import { Class } from '../../domain/entities/class.entity';

export type CreateClassUseCaseResponse = Either<AppError.UnexpectedErrorResult<Class>
  | AppError.ValidationErrorResult<Class>,
  Result<Class>>;

@Injectable()
export class CreateClassUseCase implements IUseCase<ClassCreateDto, Promise<CreateClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly classRepository: ClassRepository,
  ) {
    this._logger = new Logger('CreateClassUseCase');
  }

  async execute(request: ClassCreateDto): Promise<CreateClassUseCaseResponse> {
    this._logger.log('Executing...');

    const classOrError: Result<Class> = Class.New({ ...request });

    if (classOrError.isFailure)
      return left(classOrError);

    const c: Class = classOrError.unwrap();

    try {
      await this.classRepository.save(c);

      return right(Result.Ok(c));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
