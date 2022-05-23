import {Local} from '../../domain/entities/local.entity';
import {AppError} from '../../../shared/core/errors/AppError';
import {Injectable, Logger} from '@nestjs/common';
import {Either, left, right} from '../../../shared/core/Either';
import {LocalUpdateDto} from '../dtos/local.update.dto';
import {LocalRepository} from '../../infra/repositories/local.repository';
import {IUseCase} from '../../../shared/core/interfaces/IUseCase';
import {Result} from '../../../shared/core/Result';
import Optional from 'src/shared/core/Option';

export type UpdateFacultyUseCaseResponse =
    Either<AppError.UnexpectedErrorResult<Local>
        | AppError.ValidationErrorResult<Local>
        | AppError.ObjectNotExistResult<Local>,
        Result<Local>>;

@Injectable()
export class UpdateLocalUseCase implements IUseCase<LocalUpdateDto, Promise<UpdateFacultyUseCaseResponse>> {

    private _logger: Logger;

    constructor(private readonly localRepository: LocalRepository) {
        this._logger = new Logger('UpdateFacultyUseCase');
    }

    async execute(request: LocalUpdateDto): Promise<UpdateFacultyUseCaseResponse> {
        this._logger.log('Executing');

        const toUpdate = Optional(await this.localRepository.findById(request.localId));
        if (toUpdate.isNone())
            return left(Result.Fail(new AppError.ObjectNotExist(`Faculty with id ${request.localId} doesn't exist`)));

        const forUpdate: Local = toUpdate.unwrap();
        forUpdate.Update(request);

        try {
            await this.localRepository.save(forUpdate);
            return right(Result.Ok(forUpdate));
        } catch (error) {
            return left(Result.Fail(new AppError.UnexpectedError(error)));
        }
    }
}
