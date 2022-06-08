import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { TeachYear } from '../../../teachYear/domain/entities/teachYear.entity';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { TeachYearCreateDto } from '../../../teachYear/application/dtos/teachYear.create.dto';
import { TeachYearRepository } from '../../../teachYear/infra/repositories/teachYear.repository';
import { FindByIdFacultyUseCase } from '../../../faculty/application/useCases';

export type CreateTeachYearUseCaseResponse = Either<AppError.UnexpectedErrorResult<TeachYear>
  | AppError.ValidationErrorResult<TeachYear>,
  Result<TeachYear>>;

@Injectable()
export class CreateTeachYearUseCase implements IUseCase<TeachYearCreateDto, Promise<CreateTeachYearUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly teachYearRepository: TeachYearRepository,
  ) {
    this._logger = new Logger('CreateTeachYearUseCase');
  }

  async execute(request: TeachYearCreateDto): Promise<CreateTeachYearUseCaseResponse> {
    this._logger.log('Executing...');

    const teachYearOrError: Result<TeachYear> = TeachYear.New({ ...request });

    if (teachYearOrError.isFailure)
      return left(teachYearOrError);

    const teachYear: TeachYear = teachYearOrError.unwrap();

    try {
      await this.teachYearRepository.save(teachYear);

      // const teachYearFacultyEntries: TeachYearFaculty[] = [];
      //
      // teachYear.facultyIds.forEach(e => {
      //   teachYearFacultyEntries.push(TeachYearFaculty.New({
      //     teachYearId: teachYear._id.toString(),
      //     facultyId: e,
      //   }).unwrap());
      // });
      // await this.teachYearFacultyRepository.saveMany(teachYearFacultyEntries);

      return right(Result.Ok(teachYear));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
