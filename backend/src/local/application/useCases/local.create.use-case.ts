import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Local } from '../../domain/entities/local.entity';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { LocalCreateDto } from '../dtos/local.create.dto';
import { Injectable, Logger } from '@nestjs/common';
import { LocalRepository } from '../../infra/repositories/local.repository';

export type CreateLocalUseCaseResponse = Either<AppError.UnexpectedErrorResult<Local>
  | AppError.ValidationErrorResult<Local>,
  Result<Local>>;

@Injectable()
export class CreateLocalUseCase implements IUseCase<LocalCreateDto, Promise<CreateLocalUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly localRepository: LocalRepository) {
    this._logger = new Logger('CreateLocalUseCase');
  }

  async execute(request: LocalCreateDto): Promise<CreateLocalUseCaseResponse> {
    this._logger.log('Executing...');

    const localOrError: Result<Local> = Local.New({ ...request });

    if (localOrError.isFailure)
      return left(localOrError);

    const local: Local = localOrError.unwrap();

    try {
      await this.localRepository.save(local);
      return right(Result.Ok(local));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }

  }
}
