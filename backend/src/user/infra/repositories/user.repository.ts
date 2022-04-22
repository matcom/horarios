import {BaseRepository} from '../../../shared/modules/data-access/typeorm/base.respository';
import {IUserRepository} from '../../domain/interfaces/IRepository';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {User} from 'src/user/domain/entities/user.entity';
import {UserPersistence} from '../entities/user.persistence';
import {UserMapper} from '../mappers/user.mappers';
import {PageParams} from "../../../shared/core/PaginatorParams";
import {getDefaultPaginatedFindResult, PaginatedFindResult} from "../../../shared/core/PaginatedFindResult";

@Injectable()
export class UserRepository extends BaseRepository<User, UserPersistence> implements IUserRepository {
    constructor(@InjectRepository(UserPersistence) _repository: Repository<UserPersistence>) {
        super(_repository, UserMapper.DomainToPersist, UserMapper.PersistToDomain, 'UserRepository');
    }

    async getPaginated(paginatorParams: PageParams, filter: {}): Promise<PaginatedFindResult<User>> {
        const count = await this._entityRepository.count(filter);
        if (count == 0) return getDefaultPaginatedFindResult();

        const pageLimit: number =
            paginatorParams.pageLimit < count
                ? paginatorParams.pageLimit
                : count;
        const totalPages: number = Math.ceil(count / pageLimit);
        const currentPage: number =
            paginatorParams.pageNum < totalPages
                ? paginatorParams.pageNum
                : totalPages;

        const pageNum: number =
            paginatorParams.pageNum < totalPages
                ? paginatorParams.pageNum
                : totalPages;

        const findOffset = pageLimit * (pageNum - 1);

        const users = await this._entityRepository.find({
            where: filter,
            skip: findOffset,
            take: pageLimit,
        });

        return {
            items: users.map(u =>
                UserMapper.PersistToDomain(u),
            ),
            limit: pageLimit,
            currentPage,
            totalPages,
        };
    }
}