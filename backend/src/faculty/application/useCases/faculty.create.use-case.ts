import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Faculty } from '../../domain/entities/faculty.entity';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { FacultyCreateDto } from '../dtos/faculty.create.dto';
import { Injectable, Logger } from '@nestjs/common';
import { FacultyRepository } from '../../infra/repositories/faculty.repository';

export type CreateFacultyUseCaseResponse = Either<AppError.UnexpectedErrorResult<Faculty>
  | AppError.ValidationErrorResult<Faculty>,
  Result<Faculty>>;

@Injectable()
export class CreateFacultyUseCase implements IUseCase<FacultyCreateDto, Promise<CreateFacultyUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly facultyRepository: FacultyRepository) {
    this._logger = new Logger('CreateFacultyUseCase');
  }

  async execute(request: FacultyCreateDto): Promise<CreateFacultyUseCaseResponse> {
    this._logger.log('Executing...');

    const facultyOrError: Result<Faculty> = Faculty.New({ ...request });

    if (facultyOrError.isFailure)
      return left(facultyOrError);

    const faculty: Faculty = facultyOrError.unwrap();

    try {
      await this.facultyRepository.save(faculty);
      return right(Result.Ok(faculty));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }

  }
}
