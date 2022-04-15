import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { University } from '../../domain/entities/university.entity';
import { Result } from '../../../shared/core/Result';
import { UniversityUpdateDto } from '../dtos/university.update.dto';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { UniversityRepository } from '../../infra/repositories/university.repository';
import Optional from '../../../shared/core/Option';

export type UpdateUniversityUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<University>
    | AppError.ValidationErrorResult<University>
    | AppError.ObjectNotExistResult<University>,
    Result<University>>;

@Injectable()
export class UpdateUniversityUseCase implements IUseCase<UniversityUpdateDto, Promise<UpdateUniversityUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly universityRepository: UniversityRepository) {
    this._logger = new Logger('UpdateUniversityUseCase');
  }

  async execute(request: UniversityUpdateDto): Promise<UpdateUniversityUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.universityRepository.findById(request.universityId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`University with id ${request.universityId} doesn't exist`)));

    let forUpdate: University = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.universityRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}