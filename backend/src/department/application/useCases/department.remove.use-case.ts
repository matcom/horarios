import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Department } from '../../../department/domain/entities/department.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { DepartmentRepository } from '../../../department/infra/repositories/department.repository';
import Optional from '../../../shared/core/Option';

export type RemoveDepartmentUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Department>
    | AppError.ValidationErrorResult<Department>
    | AppError.ObjectNotExistResult<Department>,
    Result<Department>>;

@Injectable()
export class RemoveDepartmentUseCase implements IUseCase<{ id: string }, Promise<RemoveDepartmentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly departmentRepository: DepartmentRepository) {
    this._logger = new Logger('RemoveDepartmentUseCase');
  }

  async execute(request: { id: string }): Promise<RemoveDepartmentUseCaseResponse> {
    const department = Optional(await this.departmentRepository.findById(request.id));

    if (department.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Department with id ${request.id} doesn't exist`)));

    try {
      await this.departmentRepository.drop(department.unwrap());
      return right(Result.Ok(department.unwrap()));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
