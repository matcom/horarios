import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { FindAllResult } from '../../../shared/core/FindAllResult';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { CatTeacher } from '../../domain/entities/catTeacher.entity';
import { CatTeacherFindAllDto } from '../dtos/catTeacher.find-all.dto';
import { CatTeacherRepository } from '../../infra/repositories/catTeacher.repository';

export type FindAllCatTeacherUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<FindAllResult<CatTeacher>>
    | AppError.ValidationErrorResult<FindAllResult<CatTeacher>>
    | AppError.ObjectNotExistResult<FindAllResult<CatTeacher>>,
    Result<FindAllResult<CatTeacher>>>;

@Injectable()
export class FindAllCatTeacherUseCase implements IUseCase<CatTeacherFindAllDto, Promise<FindAllCatTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly catTeacherRepository: CatTeacherRepository) {
    this._logger = new Logger('FindAllCatTeacherUseCase');
  }

  async execute(request: CatTeacherFindAllDto): Promise<FindAllCatTeacherUseCaseResponse> {
    try {
      const ans = await this.catTeacherRepository.findAll(request.filter);
      return right(Result.Ok(ans));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
