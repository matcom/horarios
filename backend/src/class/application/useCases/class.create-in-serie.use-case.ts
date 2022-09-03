import { Either, left, right } from '../../../shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { CreateClassUseCase } from './class.create.use-case';
import { ClassRepository } from '../../infra/repositories/class.repository';
import { FindAllWeekUseCase } from '../../../week/application/useCases';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { FindByIdSemesterUseCase } from '../../../semester/application/useCases';
import { ClassCreateInSerieDto } from '../dtos/class.create-in-serie.dto';
import { v4 } from 'uuid';
import { IUnitOfWork, IUnitOfWorkFactory } from '../../../shared/core/interfaces/IUnitOfWork';
import { IRepository, IRepositoryFactory } from '../../../shared/core/interfaces/IRepository';
import { Class } from '../../domain/entities/class.entity';
import { MultipleResponseDto } from '../dtos/create-multiple.response.dto';
import { FindAllResult } from '../../../shared/core/FindAllResult';

export type CreateMultipleClassUseCaseResponse =
  Either<AppError.UnexpectedErrorResult<FindAllResult<MultipleResponseDto>>
    | AppError.ValidationErrorResult<FindAllResult<MultipleResponseDto>>
    | AppError.ObjectNotExistResult<FindAllResult<MultipleResponseDto>>,
    Result<FindAllResult<MultipleResponseDto>>>;

@Injectable()
export class CreteMultipleClassInSameSerieUseCase implements IUseCase<ClassCreateInSerieDto, Promise<CreateMultipleClassUseCaseResponse>> {

  private _logger: Logger;

  constructor(
    private readonly classRepository: ClassRepository,
    private readonly createClass: CreateClassUseCase,
    private readonly findWeek: FindAllWeekUseCase,
    private readonly findSemester: FindByIdSemesterUseCase,
    @Inject('IUnitOfWorkFactory') private readonly _unitOfWorkFact: IUnitOfWorkFactory,
    @Inject('IRepositoryClassFactory') private readonly repositoryFactory: IRepositoryFactory<Class, IRepository<Class>>,
  ) {
    this._logger = new Logger('CreateMultipleClassUseCase');
  }

  async execute(request: ClassCreateInSerieDto): Promise<CreateMultipleClassUseCaseResponse> {
    this._logger.log('Executing');

    const weeks = await this.findWeek.execute({
      filter: {
        firstDate: LessThanOrEqual(request.start),
        endDate: MoreThanOrEqual(request.end),
      },
    });


    if (weeks.isLeft() || weeks.value.unwrap().items.length == 0)
      return left(Result.Fail(new AppError.ValidationError('Error obteniendo el semestre. Por favor cree el turno en un semestre valido o cree antes el semestre')));

    const week = weeks.value.unwrap().items[0];
    const semester = await this.findSemester.execute(week.semesterId);

    if (semester.isLeft())
      return left(Result.Fail(new AppError.UnexpectedError(new Error('Error obteniendo el semestre. Por favor cree el turno en un semestre valido o cree antes el semestre'))));

    const serieId = v4();
    const endSemester = semester.value.unwrap().end;

    request.start = new Date(request.start);
    request.end = new Date(request.end);
    request.frequency = parseInt(request.frequency as string);

    try {
      const unitOfWork: IUnitOfWork = this._unitOfWorkFact.build();
      await unitOfWork.start();
      const repo = unitOfWork.getRepository(this.repositoryFactory);

      return await unitOfWork.commit(() => this.work(request, repo, serieId, endSemester));

    } catch (e) {
      return left(Result.Fail(new AppError.UnexpectedError(e)));
    }
  }

  private async work(request: ClassCreateInSerieDto, repo: IRepository<Class>, serieId: string, endSemester: Date): Promise<CreateMultipleClassUseCaseResponse> {

    let answer: MultipleResponseDto[] = [];
    let saved = [];
    while (true) {

      if (!(request.start.getDay() == 6 || request.start.getDay() == 0)) {

        const ans = await this.createClass.execute({
          ...Object.assign({}, request),
          serieId,
        }, false);

        if (ans.isLeft())
          return left(Result.Fail(new AppError.UnexpectedError(new Error('Fallo en la creacion multiple.\n\n' + ans.value.unwrapError().message))));

        saved.push(ans.value.unwrap());

        let unwrapped = ans.value.unwrap();
        answer.push({
          id: unwrapped._id.toString(),
          start: new Date(unwrapped.start),
          end: new Date(unwrapped.end),
        });
      }

      request.start.setDate(request.start.getDate() + (request.frequency as number));
      request.end.setDate(request.end.getDate() + (request.frequency as number));

      if (request.end.getTime() > endSemester.getTime())
        break;
    }

    for (let i = 0; i < saved.length; i++)
      await repo.save(saved[i]);

    return right(Result.Ok({
      items: answer,
    }));
  }
}
