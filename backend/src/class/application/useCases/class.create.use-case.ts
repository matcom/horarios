import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { ClassCreateDto } from '../dtos/class.create.dto';
import { ClassRepository } from '../../infra/repositories/class.repository';
import { Class } from '../../domain/entities/class.entity';
import { CheckClassUseCase } from './class.check-class-restrictions.use-case';
import { FindByIdGroupUseCase } from '../../../group/application/useCases';

export type CreateClassUseCaseResponse = Either<AppError.UnexpectedErrorResult<Class>
  | AppError.ValidationErrorResult<Class>,
  Result<Class>>;

@Injectable()
export class CreateClassUseCase implements IUseCase<ClassCreateDto, Promise<CreateClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly classRepository: ClassRepository,
    private readonly checkClass: CheckClassUseCase,
    private readonly groupFindOne: FindByIdGroupUseCase,
  ) {
    this._logger = new Logger('CreateClassUseCase');
  }

  async execute(request: ClassCreateDto): Promise<CreateClassUseCaseResponse> {
    this._logger.log('Executing...');

    const group = await this.groupFindOne.execute({ id: request.groupId.id });

    if (group.isRight())
      request.color = group.value.unwrap().color;

    const classOrError: Result<Class> = Class.New({ ...request });

    if (classOrError.isFailure)
      return left(classOrError);

    const c: Class = classOrError.unwrap();

    const check = await this.checkClass.execute(c);

    if (check.isLeft())
      return check;

    try {
      await this.classRepository.save(c);

      return right(Result.Ok(c));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
