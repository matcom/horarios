import {Local} from '../../domain/entities/local.entity';
import {Either, left, right} from '../../../shared/core/Either';
import {AppError} from '../../../shared/core/errors/AppError';
import {Injectable, Logger} from '@nestjs/common';
import {LocalRepository} from '../../infra/repositories/local.repository';
import {IUseCase} from '../../../shared/core/interfaces/IUseCase';
import {Result} from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type FindByIdLocalUseCaseResponse =
    Either<AppError.UnexpectedErrorResult<Local>
        | AppError.ValidationErrorResult<Local>
        | AppError.ObjectNotExistResult<Local>,
        Result<Local>>;

@Injectable()
export class FindByIdLocalUseCase implements IUseCase<{ id: string }, Promise<FindByIdLocalUseCaseResponse>> {

    private _logger: Logger;

    constructor(private readonly localRepository: LocalRepository) {
        this._logger = new Logger('FindByIdLocalUseCase');
    }

    async execute(request: {
        id: string
    }): Promise<FindByIdLocalUseCaseResponse> {
        try {
            return Optional(await this.localRepository.findById(request.id))
                .okOr(new AppError.ObjectNotExist(`Local with id ${request.id} doesn't exist`))
                .mapOrElse(
                    //if error
                    (err: AppError.ObjectNotExist) =>
                        left(Result.Fail(err)),
                    //if ok
                    (local: Local) =>
                        right(Result.Ok(local)),
                );

        } catch (error) {
            return left(Result.Fail(new AppError.UnexpectedError(error)));
        }
    }
}
