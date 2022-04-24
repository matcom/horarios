import { Faculty } from '../../domain/entities/faculty.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../shared/core/Either';
import { FacultyUpdateDto } from '../dtos/faculty.update.dto';
import { FacultyRepository } from '../../infra/repositories/faculty.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type UpdateFacultyUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Faculty>
    | AppError.ValidationErrorResult<Faculty>
    | AppError.ObjectNotExistResult<Faculty>,
    Result<Faculty>>;

@Injectable()
export class UpdateFacultyUseCase implements IUseCase<FacultyUpdateDto, Promise<UpdateFacultyUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly facultyRepository: FacultyRepository) {
    this._logger = new Logger('UpdateFacultyUseCase');
  }

  async execute(request: FacultyUpdateDto): Promise<UpdateFacultyUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.facultyRepository.findById(request.facultyId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Faculty with id ${request.facultyId} doesn't exist`)));

    let forUpdate: Faculty = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.facultyRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}