import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Department } from '../../../department/domain/entities/department.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { DepartmentUpdateDto } from '../../../department/application/dtos/department.update.dto';
import { DepartmentRepository } from '../../../department/infra/repositories/department.repository';
import Optional from '../../../shared/core/Option';

export type UpdateDepartmentUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Department>
    | AppError.ValidationErrorResult<Department>
    | AppError.ObjectNotExistResult<Department>,
    Result<Department>>;

@Injectable()
export class UpdateDepartmentUseCase implements IUseCase<DepartmentUpdateDto, Promise<UpdateDepartmentUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly departmentRepository: DepartmentRepository) {
    this._logger = new Logger('UpdateDepartmentUseCase');
  }

  async execute(request: DepartmentUpdateDto): Promise<UpdateDepartmentUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.departmentRepository.findById(request.departmentId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Department with id ${request.departmentId} doesn't exist`)));

    let forUpdate: Department = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.departmentRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
