import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import Optional from '../../../shared/core/Option';
import { CatTeacher } from '../../domain/entities/catTeacher.entity';
import { CatTeacherRepository } from '../../infra/repositories/catTeacher.repository';

export type RemoveCatTeacherUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<CatTeacher>
    | AppError.ValidationErrorResult<CatTeacher>
    | AppError.ObjectNotExistResult<CatTeacher>,
    Result<CatTeacher>>;

@Injectable()
export class RemoveCatTeacherUseCase implements IUseCase<{ id: string }, Promise<RemoveCatTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly catTeacherRepository: CatTeacherRepository) {
    this._logger = new Logger('RemoveCatTeacherUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveCatTeacherUseCaseResponse> {
    const university = Optional(await this.catTeacherRepository.findById(request.id));

    if (university.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`CatTeacher with id ${request.id} doesn't exist`)));

    try {
      await this.catTeacherRepository.drop(university.unwrap());
      return right(Result.Ok(university.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
