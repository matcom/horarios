import { Major } from '../../domain/entities/major.entity';
import { AppError } from '../../../shared/core/errors/AppError';
import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '../../../shared/core/Either';
import { MajorUpdateDto } from '../dtos/major.update.dto';
import { MajorRepository } from '../../infra/repositories/major.repository';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Result } from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type UpdateMajorUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<Major>
    | AppError.ValidationErrorResult<Major>
    | AppError.ObjectNotExistResult<Major>,
    Result<Major>>;

@Injectable()
export class UpdateMajorUseCase implements IUseCase<MajorUpdateDto, Promise<UpdateMajorUseCaseResponse>> {

  private _logger: Logger;

  constructor(private readonly majorRepository: MajorRepository) {
    this._logger = new Logger('UpdateMajorUseCase');
  }

  async execute(request: MajorUpdateDto): Promise<UpdateMajorUseCaseResponse> {
    this._logger.log('Executing');

    const toUpdate = Optional(await this.majorRepository.findById(request.majorId));
    if (toUpdate.isNone())
      return left(Result.Fail(new AppError.ObjectNotExist(`Major with id ${request.majorId} doesn't exist`)));

    const forUpdate: Major = toUpdate.unwrap();
    forUpdate.Update(request);

    try {
      await this.majorRepository.save(forUpdate);
      return right(Result.Ok(forUpdate));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
