import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import Optional from '../../../shared/core/Option';
import { CatTeacher } from '../../domain/entities/catTeacher.entity';
import { CatTeacherRepository } from '../../infra/repositories/catTeacher.repository';

export type FindByIdCatTeacherUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<CatTeacher>
    | AppError.ValidationErrorResult<CatTeacher>
    | AppError.ObjectNotExistResult<CatTeacher>,
    Result<CatTeacher>>;

@Injectable()
export class FindByIdCatTeacherUseCase implements IUseCase<{ id: string }, Promise<FindByIdCatTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly catTeacherRepository: CatTeacherRepository) {
    this._logger = new Logger('FindByIdCatTeacherUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdCatTeacherUseCaseResponse> {
    try {
      return Optional(await this.catTeacherRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`CatTeacher with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (university: CatTeacher) =>
            right(Result.Ok(university)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
