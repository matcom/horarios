import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { ClassRepository } from '../../infra/repositories/class.repository';
import { Brackets } from 'typeorm';
import { Class } from '../../domain/entities/class.entity';
import * as moment from 'moment';

export type CheckClassUseCaseResponse = Either<AppError.UnexpectedErrorResult<any>
  | AppError.ValidationErrorResult<any>,
  Result<any>>;

@Injectable()
export class CheckClassUseCase implements IUseCase<Class, Promise<CheckClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly classRepository: ClassRepository) {
    this._logger = new Logger('CheckClassUseCase');
  }

  async execute(request: Class): Promise<CheckClassUseCaseResponse> {
    this._logger.log('Executing...');

    let qB = (await this
      .classRepository
      .getQueryBuilder('class'))
      .leftJoinAndSelect('class.teachers', 'teachers')
      .leftJoinAndSelect('class.local', 'local');

    if (request.teacherIds)
      for (let i = 0; i < request.teacherIds.length; ++i) {
        const id = request.teacherIds[i].id;

        const teacherRestrictions = await qB
          .where('teachers.id = :id', { id })
          .andWhere(new Brackets(br => {
            br
              .where(new Brackets(b => {
                b
                  .where('class.start <= :startDate1', { startDate1: request.start })
                  .andWhere(':startDate2 <= class.end', { startDate2: request.start });
              }))
              .orWhere(new Brackets(b => {
                b
                  .where('class.start <= :endDate1', { endDate1: request.end })
                  .andWhere(':endDate2 <= class.end', { endDate2: request.end });
              }));
          }))
          .andWhere('class.serieId != :serieId', { serieId: request.serieId })
          .getCount();

        if (teacherRestrictions > 0)
          return left(Result.Fail(new
          AppError
            .ValidationError(`Estado invalido para esta clase (${moment(request.start).format('MMMM Do YYYY, h:mm:ss a')}). No se puede crear. Posibles razones: profesor ya asignado a otra clase en ese horario o en parte de ese horario.`)));
      }

    const localRestrictions = await qB
      .where('local.id = :id', { id: request.localId.id })
      .andWhere(new Brackets(br => {
        br
          .where(new Brackets(b => {
            b
              .where('class.start <= :startDate1', { startDate1: request.start })
              .andWhere(':startDate2 <= class.end', { startDate2: request.start });
          }))
          .orWhere(new Brackets(b => {
            b
              .where('class.start <= :endDate1', { endDate1: request.end })
              .andWhere(':endDate2 <= class.end', { endDate2: request.end });
          }));
      }))
      .andWhere('class.serieId != :serieId', { serieId: request.serieId })
      .getCount();

    if (localRestrictions > 0)
      return left(Result.Fail(new
      AppError
        .ValidationError(`Estado invalido para esta clase  (${moment(request.start).format('MMMM Do YYYY, h:mm:ss a')}). No se puede crear. Posibles razones: local ya asignado a otra clase en ese horario, o en parte de ese horario.`)));


    return right(Result.Ok());
  }
}