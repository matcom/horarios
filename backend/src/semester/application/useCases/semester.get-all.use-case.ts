import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Semester } from '../../domain/entities/semester.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { SemesterRepository } from '../../infra/repositories/semester.repository';
import { FindAllResult } from '../../../shared/core/FindAllResult';
import { SemesterFindAllDto } from '../dtos/semester.find-all.dto';

export type FindAllSemesterUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<FindAllResult<Semester>>
    | AppError.ValidationErrorResult<FindAllResult<Semester>>
    | AppError.ObjectNotExistResult<FindAllResult<Semester>>,
    Result<FindAllResult<Semester>>>;

@Injectable()
export class FindAllSemesterUseCase implements IUseCase<SemesterFindAllDto, Promise<FindAllSemesterUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly semesterRepository: SemesterRepository) {
    this._logger = new Logger('FindAllSemesterUseCase');
  }

  async execute(request: SemesterFindAllDto): Promise<FindAllSemesterUseCaseResponse> {
    try {
      const ans = await this.semesterRepository.findAll(request.filter);
      return right(Result.Ok(ans));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
