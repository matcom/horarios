import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { GroupCreateDto } from '../dtos/group.create.dto';
import { Group } from 'src/group/domain/entities/group.entity';
import { GroupRepository } from '../../infra/repositories/group.repository';

export type CreateGroupUseCaseResponse = Either<AppError.UnexpectedErrorResult<Group>
  | AppError.ValidationErrorResult<Group>,
  Result<Group>>;

@Injectable()
export class CreateGroupUseCase implements IUseCase<GroupCreateDto, Promise<CreateGroupUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly groupRepository: GroupRepository,
  ) {
    this._logger = new Logger('CreateGroupUseCase');
  }

  async execute(request: GroupCreateDto): Promise<CreateGroupUseCaseResponse> {
    this._logger.log('Executing...');

    const groupOrError: Result<Group> = Group.New({ ...request });

    if (groupOrError.isFailure)
      return left(groupOrError);

    const group: Group = groupOrError.unwrap();

    try {
      await this.groupRepository.save(group);

      return right(Result.Ok(group));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
