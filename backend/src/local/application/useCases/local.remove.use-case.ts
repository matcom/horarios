import { Local } from '../../domain/entities/local.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../shared/core/Either';
import { LocalRepository } from '../../infra/repositories/local.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type RemoveLocalUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Local>
    | AppError.ValidationErrorResult<Local>
    | AppError.ObjectNotExistResult<Local>,
    Result<Local>>;

@Injectable()
export class RemoveLocalUseCase implements IUseCase<{ id: string }, Promise<RemoveLocalUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly localRepository: LocalRepository) {
    this._logger = new Logger('RemoveFacultyUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveLocalUseCaseResponse> {
    const local = Optional(await this.localRepository.findById(request.id));

    if (local.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Local with id ${request.id} doesn't exist`)));

    try {
      await this.localRepository.drop(local.unwrap());
      return right(Result.Ok(local.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
