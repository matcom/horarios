import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { TeachActivity } from '../../../teachActivity/domain/entities/teachActivity.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachActivityCreateDto } from '../../../teachActivity/application/dtos/teachActivity.create.dto';
import { TeachActivityRepository } from '../../../teachActivity/infra/repositories/teachActivity.repository';
import { FindByIdFacultyUseCase } from '../../../faculty/application/useCases';

export type CreateTeachActivityUseCaseResponse = Either<AppError.UnexpectedErrorResult<TeachActivity>
  | AppError.ValidationErrorResult<TeachActivity>,
  Result<TeachActivity>>;

@Injectable()
export class CreateTeachActivityUseCase implements IUseCase<TeachActivityCreateDto, Promise<CreateTeachActivityUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly teachActivityRepository: TeachActivityRepository,
  ) {
    this._logger = new Logger('CreateTeachActivityUseCase');
  }

  async execute(request: TeachActivityCreateDto): Promise<CreateTeachActivityUseCaseResponse> {
    this._logger.log('Executing...');

    const teachActivityOrError: Result<TeachActivity> = TeachActivity.New({ ...request });

    if (teachActivityOrError.isFailure)
      return left(teachActivityOrError);

    const teachActivity: TeachActivity = teachActivityOrError.unwrap();

    try {
      await this.teachActivityRepository.save(teachActivity);

      // const teachActivityFacultyEntries: TeachActivityFaculty[] = [];
      //
      // teachActivity.facultyIds.forEach(e => {
      //   teachActivityFacultyEntries.push(TeachActivityFaculty.New({
      //     teachActivityId: teachActivity._id.toString(),
      //     facultyId: e,
      //   }).unwrap());
      // });
      // await this.teachActivityFacultyRepository.saveMany(teachActivityFacultyEntries);

      return right(Result.Ok(teachActivity));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
