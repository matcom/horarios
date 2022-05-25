import {Either, left, right} from '../../../shared/core/Either';
import {AppError} from '../../../shared/core/errors/AppError';
import {Result} from '../../../shared/core/Result';
import {Major} from '../../domain/entities/major.entity';
import {IUseCase} from '../../../shared/core/interfaces/IUseCase';
import {MajorCreateDto} from '../dtos/major.create.dto';
import {Injectable, Logger} from '@nestjs/common';
import {MajorRepository} from '../../infra/repositories/major.repository';

export type CreateMajorUseCaseResponse = Either<AppError.UnexpectedErrorResult<Major>
    | AppError.ValidationErrorResult<Major>,
    Result<Major>>;

@Injectable()
export class CreateMajorUseCase implements IUseCase<MajorCreateDto, Promise<CreateMajorUseCaseResponse>> {

    private _logger: Logger;

    constructor(private readonly majorRepository: MajorRepository) {
        this._logger = new Logger('CreateMajorUseCase');
    }

    async execute(request: MajorCreateDto): Promise<CreateMajorUseCaseResponse> {
        this._logger.log('Executing...');

        const majorOrError: Result<Major> = Major.New({...request});

        if (majorOrError.isFailure)
            return left(majorOrError);

        const major: Major = majorOrError.unwrap();

        try {
            await this.majorRepository.save(major);
            return right(Result.Ok(major));
        } catch (error) {
            return left(Result.Fail(new AppError.UnexpectedError(error)));
        }

    }
}
