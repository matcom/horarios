import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { Faculty } from '../../domain/entities/faculty.entity';
import { FacultyPersistence } from '../entities/faculty.persistence';
import { IFacultyRepository } from '../../domain/interfaces/IFacultyRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageParams } from '../../../shared/core/PaginatorParams';
import { getDefaultPaginatedFindResult, PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { FacultyMappers } from '../mappers/faculty.mappers';

@Injectable()
export class FacultyRepository extends BaseRepository<Faculty, FacultyPersistence> implements IFacultyRepository {
  constructor(@InjectRepository(FacultyPersistence) _repository: Repository<FacultyPersistence>) {
    super(_repository, FacultyMappers.DomainToPersist, FacultyMappers.PersistToDomain, 'FacultyRepository');
  }

  async getPaginated(paginatorParams: PageParams, filter: {}): Promise<PaginatedFindResult<Faculty>> {
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

    const universities = await this._entityRepository.find({
      where: filter,
      skip: findOffset,
      take: pageLimit,
    });

    return {
      items: universities.map(u =>
        FacultyMappers.PersistToDomain(u),
      ),
      limit: pageLimit,
      currentPage,
      totalPages,
    };
  }
}