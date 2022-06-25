import { Either, left, right } from 'src/shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Semester } from '../../domain/entities/semester.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { SemesterCreateDto } from '../dtos/semester.create.dto';
import { SemesterRepository } from '../../infra/repositories/semester.repository';

export type CreateSemesterUseCaseResponse = Either<AppError.UnexpectedErrorResult<Semester>
  | AppError.ValidationErrorResult<Semester>,
  Result<Semester>>;

@Injectable()
export class CreateSemesterUseCase implements IUseCase<SemesterCreateDto, Promise<CreateSemesterUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly semesterRepository: SemesterRepository) {
    this._logger = new Logger('CreateSemesterUseCase');
  }

  async execute(request: SemesterCreateDto): Promise<CreateSemesterUseCaseResponse> {
    this._logger.log('Executing...');

    const semesterDomainOrError: Result<Semester> = Semester.New({
      ...request,
    });

    if (semesterDomainOrError.isFailure)
      return left(semesterDomainOrError);

    const semester: Semester = semesterDomainOrError.unwrap();

    try {
      await this.semesterRepository.save(semester);
      return right(Result.Ok(semester));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}