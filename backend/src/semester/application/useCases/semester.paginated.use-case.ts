import {Either, left, right} from 'src/shared/core/Either';
import {AppError} from '../../../shared/core/errors/AppError';
import {Semester} from '../../domain/entities/semester.entity';
import {Result} from '../../../shared/core/Result';
import {IUseCase} from '../../../shared/core/interfaces/IUseCase';
import {SemesterPaginatedDto} from '../dtos/semester.paginated.dto';
import {Injectable, Logger} from '@nestjs/common';
import {SemesterRepository} from '../../infra/repositories/semester.repository';
import {PageParams} from 'src/shared/core/PaginatorParams';
import {PaginatedFindResult} from '../../../shared/core/PaginatedFindResult';

export type PaginatedSemesterUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Semester>>
    | AppError.ValidationErrorResult<PaginatedFindResult<Semester>>,
    Result<PaginatedFindResult<Semester>>>;

@Injectable()
export class PaginatedSemesterUseCase implements IUseCase<SemesterPaginatedDto, Promise<PaginatedSemesterUseCaseResponse>> {

    private _logger: Logger;

    constructor(private readonly semesterRepository: SemesterRepository) {
        this._logger = new Logger('PaginatedSemesterUseCase');
    }

    async execute(request: SemesterPaginatedDto): Promise<PaginatedSemesterUseCaseResponse> {
        this._logger.log('Executing..');

        try {
            return (
                await PageParams.create(
                    request.pageParams,
                ).mapAsync(async (pageParams: PageParams) =>
                    this.semesterRepository.getPaginated(
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
