import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import Optional from '../../../shared/core/Option';
import { CatTeacher } from 'src/categoryTeacher/domain/entities/catTeacher.entity';
import { CatTeacherUpdateDto } from 'src/categoryTeacher/application/dtos/catTeacher.update.dto';
import { CatTeacherRepository } from '../../infra/repositories/catTeacher.repository';

export type UpdateCatTeacherUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<CatTeacher>
    | AppError.ValidationErrorResult<CatTeacher>
    | AppError.ObjectNotExistResult<CatTeacher>,
    Result<CatTeacher>>;

@Injectable()
export class UpdateCatTeacherUseCase implements IUseCase<CatTeacherUpdateDto, Promise<UpdateCatTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly catTeacherRepository: CatTeacherRepository) {
    this._logger = new Logger('UpdateCatTeacherUseCase');
  }

  async execute(request: CatTeacherUpdateDto): Promise<UpdateCatTeacherUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.catTeacherRepository.findById(request.universityId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`CatTeacher with id ${request.universityId} doesn't exist`)));

    let forUpdate: CatTeacher = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.catTeacherRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
