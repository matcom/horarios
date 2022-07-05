import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Department } from '../../../department/domain/entities/department.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { DepartmentPaginatedDto } from '../../../department/application/dtos/department.paginated.dto';
import { DepartmentRepository } from '../../../department/infra/repositories/department.repository';
import { PageParams } from '../../../shared/core/PaginatorParams';

export type PaginatedDepartmentUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Department>>
  | AppError.ValidationErrorResult<PaginatedFindResult<Department>>,
  Result<PaginatedFindResult<Department>>>;

@Injectable()
export class PaginatedDepartmentUseCase implements IUseCase<DepartmentPaginatedDto, Promise<PaginatedDepartmentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly departmentRepository: DepartmentRepository) {
    this._logger = new Logger('PaginatedDepartmentUseCase');
  }

  async execute(request: DepartmentPaginatedDto): Promise<PaginatedDepartmentUseCaseResponse> {
    this._logger.log('Executing..');

    try {
      return (
        await PageParams.create(
          request.pageParams,
        ).mapAsync(async (pageParams: PageParams) =>
          this.departmentRepository.getPaginated(
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
