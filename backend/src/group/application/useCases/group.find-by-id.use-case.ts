import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Group } from '../../../group/domain/entities/group.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { GroupRepository } from '../../../group/infra/repositories/group.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdGroupUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Group>
    | AppError.ValidationErrorResult<Group>
    | AppError.ObjectNotExistResult<Group>,
    Result<Group>>;

@Injectable()
export class FindByIdGroupUseCase implements IUseCase<{ id: string }, Promise<FindByIdGroupUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly groupRepository: GroupRepository) {
    this._logger = new Logger('FindByIdGroupUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdGroupUseCaseResponse> {
    try {
      return Optional(await this.groupRepository.findById(request.id))
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
