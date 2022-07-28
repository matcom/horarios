import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { ClassCreateDto } from '../dtos/class.create.dto';
import { ClassRepository } from '../../infra/repositories/class.repository';
import { Class } from '../../domain/entities/class.entity';
import { Brackets } from 'typeorm';

export type CreateClassUseCaseResponse = Either<AppError.UnexpectedErrorResult<Class>
  | AppError.ValidationErrorResult<Class>,
  Result<Class>>;

@Injectable()
export class CreateClassUseCase implements IUseCase<ClassCreateDto, Promise<CreateClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly classRepository: ClassRepository,
  ) {
    this._logger = new Logger('CreateClassUseCase');
  }

  async execute(request: ClassCreateDto): Promise<CreateClassUseCaseResponse> {
    this._logger.log('Executing...');

    const classOrError: Result<Class> = Class.New({ ...request });

    if (classOrError.isFailure)
      return left(classOrError);

    let qB = (await this
      .classRepository
      .getQueryBuilder('class'))
      .leftJoinAndSelect('class.teachers', 'teachers');

    for (let i = 0; i < request.teacherIds.length; ++i) {
      const id = request.teacherIds[i];

      const amount = await qB
        .where('teachers.id = :id', { id: id.id })
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
        .getCount();

      if (amount > 0)
        return left(Result.Fail(new
        AppError
          .ValidationError('Estado invalido para esta clase. No se puede crear. Posibles razones: profesor ya asignado a otra clase en ese horario, local de la clase ocupado en ese horario.')));

    }

    const c: Class = classOrError.unwrap();

    try {
      await this.classRepository.save(c);

      return right(Result.Ok(c));
    } catch (error) {
      return left(Result.Fail(new AppError.UnexpectedError(error)));
    }
  }
}
