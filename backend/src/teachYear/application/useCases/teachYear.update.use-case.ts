import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { TeachYear } from '../../../teachYear/domain/entities/teachYear.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachYearUpdateDto } from '../../../teachYear/application/dtos/teachYear.update.dto';
import { TeachYearRepository } from '../../../teachYear/infra/repositories/teachYear.repository';
import Optional from '../../../shared/core/Option';

export type UpdateTeachYearUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<TeachYear>
    | AppError.ValidationErrorResult<TeachYear>
    | AppError.ObjectNotExistResult<TeachYear>,
    Result<TeachYear>>;

@Injectable()
export class UpdateTeachYearUseCase implements IUseCase<TeachYearUpdateDto, Promise<UpdateTeachYearUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly teachYearRepository: TeachYearRepository) {
    this._logger = new Logger('UpdateTeachYearUseCase');
  }

  async execute(request: TeachYearUpdateDto): Promise<UpdateTeachYearUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.teachYearRepository.findById(request.teachYearId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`TeachYear with id ${request.teachYearId} doesn't exist`)));

    let forUpdate: TeachYear = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.teachYearRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
