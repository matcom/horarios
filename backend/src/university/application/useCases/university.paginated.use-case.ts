import {Either, left, right} from 'src/shared/core/Either';
import {AppError} from '../../../shared/core/errors/AppError';
import {University} from '../../domain/entities/university.entity';
import {Result} from '../../../shared/core/Result';
import {IUseCase} from '../../../shared/core/interfaces/IUseCase';
import {UniversityPaginatedDto} from '../dtos/university.paginated.dto';
import {Injectable, Logger} from '@nestjs/common';
import {UniversityRepository} from '../../infra/repositories/university.repository';
import {PageParams} from 'src/shared/core/PaginatorParams';
import {PaginatedFindResult} from '../../../shared/core/PaginatedFindResult';

export type PaginatedUniversityUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<University>>
    | AppError.ValidationErrorResult<PaginatedFindResult<University>>,
    Result<PaginatedFindResult<University>>>;

@Injectable()
export class PaginatedUniversityUseCase implements IUseCase<UniversityPaginatedDto, Promise<PaginatedUniversityUseCaseResponse>> {

    private _logger: Logger;

    constructor(private readonly universityRepository: UniversityRepository) {
        this._logger = new Logger('PaginatedUniversityUseCase');
    }

    async execute(request: UniversityPaginatedDto): Promise<PaginatedUniversityUseCaseResponse> {
        this._logger.log('Executing..');

        try {
            return (
                await PageParams.create(
                    request.pageParams,
                ).mapAsync(async (pageParams: PageParams) =>
                    this.universityRepository.getPaginated(
                        pageParams,
                        request.filter,
                    ),
                )
            ).mapOrElse(
                // Err case
                err => left(Result.Fail(err)),
                // Ok case
                result => right(Result.Ok(result)),
            );
        } catch (err) {
            return left(Result.Fail(new AppError.UnexpectedError(err)));
        }

    }
}
