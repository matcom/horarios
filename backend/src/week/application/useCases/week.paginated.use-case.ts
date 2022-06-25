import {Either, left, right} from 'src/shared/core/Either';
import {AppError} from '../../../shared/core/errors/AppError';
import {Week} from '../../domain/entities/week.entity';
import {Result} from '../../../shared/core/Result';
import {IUseCase} from '../../../shared/core/interfaces/IUseCase';
import {WeekPaginatedDto} from '../dtos/week.paginated.dto';
import {Injectable, Logger} from '@nestjs/common';
import {WeekRepository} from '../../infra/repositories/week.repository';
import {PageParams} from 'src/shared/core/PaginatorParams';
import {PaginatedFindResult} from '../../../shared/core/PaginatedFindResult';

export type PaginatedWeekUseCaseResponse = Either<AppError.UnexpectedErrorResult<PaginatedFindResult<Week>>
    | AppError.ValidationErrorResult<PaginatedFindResult<Week>>,
    Result<PaginatedFindResult<Week>>>;

@Injectable()
export class PaginatedWeekUseCase implements IUseCase<WeekPaginatedDto, Promise<PaginatedWeekUseCaseResponse>> {

    private _logger: Logger;

    constructor(private readonly weekRepository: WeekRepository) {
        this._logger = new Logger('PaginatedWeekUseCase');
    }

    async execute(request: WeekPaginatedDto): Promise<PaginatedWeekUseCaseResponse> {
        this._logger.log('Executing..');

        try {
            return (
                await PageParams.create(
                    request.pageParams,
                ).mapAsync(async (pageParams: PageParams) =>
                    this.weekRepository.getPaginated(
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
