import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Department } from '../../domain/entities/department.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { DepartmentRepository } from '../../infra/repositories/department.repository';
import Optional from '../../../shared/core/Option';

export type FindDetailsDepartmentUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Department>
    | AppError.ValidationErrorResult<Department>
    | AppError.ObjectNotExistResult<Department>,
    Result<Department>>;

@Injectable()
export class FindDetailsDepartmentUseCase implements IUseCase<{ id: string }, Promise<FindDetailsDepartmentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly departmentRepository: DepartmentRepository) {
    this._logger = new Logger('FindDetailsDepartmentUseCase');
  }

  async execute(request: {
    id: string
  }): Promise<FindDetailsDepartmentUseCaseResponse> {
    try {
      return Optional(await this.departmentRepository.findDetails(request.id))
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
