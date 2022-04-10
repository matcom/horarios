import { Either, left, right } from 'src/shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { University } from '../../domain/entities/university.entity';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { UniversityCreateDto } from '../dtos/university.create.dto';
import { UniversityRepository } from '../../infra/repositories/university.repository';

export type CreateUniversityUseCaseResponse = Either<AppError.UnexpectedErrorResult<University>
  | AppError.ValidationErrorResult<University>,
  Result<University>>;

@Injectable()
export class CreateUniversityUseCase implements IUseCase<UniversityCreateDto, Promise<CreateUniversityUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly universityRepository: UniversityRepository) {
    this._logger = new Logger('CreateUniversityUseCase');
  }

  async execute(request: UniversityCreateDto): Promise<CreateUniversityUseCaseResponse> {
    this._logger.log('Executing...');

    const universityDomainOrError: Result<University> = University.New({
      priority: request.priority,
      shortName: request.shortName,
      fullName: request.fullName,
      description: request.description,
    });

    if (universityDomainOrError.isFailure)
      return left(universityDomainOrError);

    const university: University = universityDomainOrError.unwrap();

    try {
      await this.universityRepository.save(university);
      return right(Result.Ok(university));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}