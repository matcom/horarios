import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Department } from '../../../department/domain/entities/department.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { DepartmentRepository } from '../../../department/infra/repositories/department.repository';
import Optional from '../../../shared/core/Option';

export type FindByIdDepartmentUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Department>
    | AppError.ValidationErrorResult<Department>
    | AppError.ObjectNotExistResult<Department>,
    Result<Department>>;

@Injectable()
export class FindByIdDepartmentUseCase implements IUseCase<{ id: string }, Promise<FindByIdDepartmentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly departmentRepository: DepartmentRepository) {
    this._logger = new Logger('FindByIdDepartmentUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindByIdDepartmentUseCaseResponse> {
    try {
      return Optional(await this.departmentRepository.findById(request.id))
        .okOr(new AppError.ObjectNotExist(`Department with id ${request.id} doesn't exist`))
        .mapOrElse(
          //if error
          (err: AppError.ObjectNotExist) =>
            left(Result.Fail(err)),
          //if ok
          (department: Department) =>
            right(Result.Ok(department)),
        );

    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
