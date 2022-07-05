import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Group } from '../../../group/domain/entities/group.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { GroupUpdateDto } from '../../../group/application/dtos/group.update.dto';
import { GroupRepository } from '../../../group/infra/repositories/group.repository';
import Optional from '../../../shared/core/Option';

export type UpdateGroupUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Group>
    | AppError.ValidationErrorResult<Group>
    | AppError.ObjectNotExistResult<Group>,
    Result<Group>>;

@Injectable()
export class UpdateGroupUseCase implements IUseCase<GroupUpdateDto, Promise<UpdateGroupUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly groupRepository: GroupRepository) {
    this._logger = new Logger('UpdateGroupUseCase');
  }

  async execute(request: GroupUpdateDto): Promise<UpdateGroupUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.groupRepository.findById(request.groupId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Group with id ${request.groupId} doesn't exist`)));

    let forUpdate: Group = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.groupRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
