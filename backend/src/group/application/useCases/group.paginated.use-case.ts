import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Group } from '../../../group/domain/entities/group.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { GroupPaginatedDto } from '../../../group/application/dtos/group.paginated.dto';
import { GroupRepository } from '../../../group/infra/repositories/group.repository';
import { PageParams } from '../../../shared/core/PaginatorParams';

export type PaginatedGroupUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Group>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Group>>,
  Result<PaginatedFindResult<Group>>>;

@Injectable()
export class PaginatedGroupUseCase implements IUseCase<GroupPaginatedDto, Promise<PaginatedGroupUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly groupRepository: GroupRepository) {
    this._logger = new Logger('PaginatedGroupUseCase');
  }

  async execute(request: GroupPaginatedDto): Promise<PaginatedGroupUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.groupRepository.getPaginated(
            pageParams,
            request.filter,
          ),
        )
      ).mapOrElse(
        // Err case
        err => left(Result.Fail(err)),
        // Ok case
        result => right(Result.Ok(result)),
      );
    } catch (err) {
      return left(Result.Fail(new AppError.UnexpectedError(err)));
    }
  }
}
