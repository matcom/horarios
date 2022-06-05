import {Major} from '../../domain/entities/major.entity';
import {Either, left, right} from '../../../shared/core/Either';
import {AppError} from '../../../shared/core/errors/AppError';
import {Injectable, Logger} from '@nestjs/common';
import {MajorRepository} from '../../infra/repositories/major.repository';
import {IUseCase} from '../../../shared/core/interfaces/IUseCase';
import {Result} from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type FindByIdMajorUseCaseResponse =
    Either<AppError.UnexpectedErrorResult<Major>
        | AppError.ValidationErrorResult<Major>
        | AppError.ObjectNotExistResult<Major>,
        Result<Major>>;

@Injectable()
export class FindByIdMajorUseCase implements IUseCase<{ id: string }, Promise<FindByIdMajorUseCaseResponse>> {

    private _logger: Logger;

    constructor(private readonly majorRepository: MajorRepository) {
        this._logger = new Logger('FindByIdMajorUseCase');
    }

    async execute(request: {
        id: string
    }): Promise<FindByIdMajorUseCaseResponse> {
        try {
            return Optional(await this.majorRepository.findById(request.id))
                .okOr(new AppError.ObjectNotExist(`Major with id ${request.id} doesn't exist`))
                .mapOrElse(
                    //if error
                    (err: AppError.ObjectNotExist) =>
                        left(Result.Fail(err)),
                    //if ok
                    (major: Major) =>
                        right(Result.Ok(major)),
                );

        } catch (error) {
            return left(Result.Fail(new AppError.UnexpectedError(error)));
        }
    }
}
