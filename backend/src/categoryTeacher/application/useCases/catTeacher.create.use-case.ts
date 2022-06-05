import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { CatTeacher } from 'src/categoryTeacher/domain/entities/catTeacher.entity';
import { CatTeacherCreateDto } from '../dtos/catTeacher.create.dto';
import { CatTeacherRepository } from '../../infra/repositories/catTeacher.repository';

export type CreateCatTeacherUseCaseResponse = Either<AppError.UnexpectedErrorResult<CatTeacher>
  | AppError.ValidationErrorResult<CatTeacher>,
  Result<CatTeacher>>;

@Injectable()
export class CreateCatTeacherUseCase implements IUseCase<CatTeacherCreateDto, Promise<CreateCatTeacherUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly catTeacherRepository: CatTeacherRepository) {
    this._logger = new Logger('CreateCatTeacherUseCase');
  }

  async execute(request: CatTeacherCreateDto): Promise<CreateCatTeacherUseCaseResponse> {
    this._logger.log('Executing...');

    const universityDomainOrError: Result<CatTeacher> = CatTeacher.New({
      priority: request.priority,
      shortName: request.shortName,
      fullName: request.fullName,
      description: request.description,
      categoryName: request.categoryName,
    });

    if (universityDomainOrError.isFailure)
      return left(universityDomainOrError);

    const university: CatTeacher = universityDomainOrError.unwrap();

    try {
      await this.catTeacherRepository.save(university);
      return right(Result.Ok(university));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
