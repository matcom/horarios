import { Either, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { ClassUpdateMultipleInSameSerieDto } from '../dtos/class-update-multiple-in-same-serie.dto';
import { UpdateClassUseCase } from './class.update.use-case';
import { FindAllClassUseCase } from './class.find-all.use-case';
import * as moment from 'moment';
import { ClassRepository } from '../../infra/repositories/class.repository';

export type UpdateMultipleClassUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<number | any>
    | AppError.ValidationErrorResult<number | any>
    | AppError.ObjectNotExistResult<number | any>,
    Result<number | any>>;

@Injectable()
export class UpdateMultipleClassInSameSerieUseCase implements IUseCase<ClassUpdateMultipleInSameSerieDto, Promise<UpdateMultipleClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly update: UpdateClassUseCase,
    private readonly findAll: FindAllClassUseCase,
    private readonly classRepository: ClassRepository) {
    this._logger = new Logger('UpdateMultipleClassUseCase');
  }

  async execute(request: ClassUpdateMultipleInSameSerieDto): Promise<UpdateMultipleClassUseCaseResponse> {
    this._logger.log('Executing');

    const classes = await this.findAll.execute({
      filter: {
        serieId: request.serieId,
      },
    });

    const classIds = classes.value.unwrap().items.map(c => c._id.toString());

    const diffInStartHours =
      moment(request.toUpdateClass.start)
        .diff(moment(request.originalClass.start), 'second');

    const diffInEndHours =
      moment(request.toUpdateClass.end)
        .diff(moment(request.originalClass.end), 'second');

    let parseArray = '';
    classIds.forEach(c => {
      parseArray += `'${c}',`;
    });

    const rawQuery1 = `UPDATE "class"
                       SET start = start + INTERVAL ` + `'${diffInStartHours} second'` + ` WHERE "id" IN (${parseArray.slice(0, -1)})`;

    const rawQuery2 = `UPDATE "class"
                       SET "end" = "end" + INTERVAL ` + `'${diffInEndHours} second'` + ` WHERE "id" IN (${parseArray.slice(0, -1)})`;

    await this.classRepository.executeRawQuery(rawQuery1, []);
    await this.classRepository.executeRawQuery(rawQuery2, []);

    return right(Result.Ok(classIds.length));
  }
}
