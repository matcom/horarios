import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Group } from '../../domain/entities/group.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { GroupRepository } from '../../infra/repositories/group.repository';
import Optional from '../../../shared/core/Option';

export type FindDetailsGroupUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Group>
    | AppError.ValidationErrorResult<Group>
    | AppError.ObjectNotExistResult<Group>,
    Result<Group>>;

@Injectable()
export class FindDetailsGroupUseCase implements IUseCase<{ id: string }, Promise<FindDetailsGroupUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly groupRepository: GroupRepository) {
    this._logger = new Logger('FindDetailsGroupUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindDetailsGroupUseCaseResponse> {
    try {
      return Optional(await this.groupRepository.findDetails(request.id))
        .okOr(new AppError.ObjectNotExist(`Group with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (group: Group) =>
            right(Result.Ok(group)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
