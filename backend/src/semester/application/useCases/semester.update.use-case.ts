import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Semester } from '../../domain/entities/semester.entity';
import { Result } from '../../../shared/core/Result';
import { SemesterUpdateDto } from '../dtos/semester.update.dto';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { SemesterRepository } from '../../infra/repositories/semester.repository';
import Optional from '../../../shared/core/Option';

export type UpdateSemesterUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Semester>
    | AppError.ValidationErrorResult<Semester>
    | AppError.ObjectNotExistResult<Semester>,
    Result<Semester>>;

@Injectable()
export class UpdateSemesterUseCase implements IUseCase<SemesterUpdateDto, Promise<UpdateSemesterUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly semesterRepository: SemesterRepository) {
    this._logger = new Logger('UpdateSemesterUseCase');
  }

  async execute(request: SemesterUpdateDto): Promise<UpdateSemesterUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.semesterRepository.findById(request.semesterId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Semester with id ${request.semesterId} doesn't exist`)));

    let forUpdate: Semester = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.semesterRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}