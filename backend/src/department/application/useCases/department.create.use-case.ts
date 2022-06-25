import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { DepartmentCreateDto } from '../dtos/department.create.dto';
import { Department } from 'src/department/domain/entities/department.entity';
import { DepartmentRepository } from '../../infra/repositories/department.repository';

export type CreateDepartmentUseCaseResponse = Either<AppError.UnexpectedErrorResult<Department>
  | AppError.ValidationErrorResult<Department>,
  Result<Department>>;

@Injectable()
export class CreateDepartmentUseCase implements IUseCase<DepartmentCreateDto, Promise<CreateDepartmentUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly departmentRepository: DepartmentRepository,
  ) {
    this._logger = new Logger('CreateDepartmentUseCase');
  }

  async execute(request: DepartmentCreateDto): Promise<CreateDepartmentUseCaseResponse> {
    this._logger.log('Executing...');

    const departmentOrError: Result<Department> = Department.New({ ...request });

    if (departmentOrError.isFailure)
      return left(departmentOrError);

    const department: Department = departmentOrError.unwrap();

    try {
      await this.departmentRepository.save(department);

      return right(Result.Ok(department));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
