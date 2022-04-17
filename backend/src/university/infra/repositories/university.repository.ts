import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { University } from '../../domain/entities/university.entity';
import { UniversityPersistence } from '../entities/university.persistence';
import { IUniversityRepository } from '../../domain/interfaces/IUniversityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UniversityMapper } from '../mappers/university.mapper';
import { Injectable } from '@nestjs/common';
import { getDefaultPaginatedFindResult, PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { PageParams } from '../../../shared/core/PaginatorParams';

@Injectable()
export class UniversityRepository extends BaseRepository<University, UniversityPersistence> implements IUniversityRepository {
  constructor(@InjectRepository(UniversityPersistence) _repository: Repository<UniversityPersistence>) {
    super(_repository, UniversityMapper.DomainToPersist, UniversityMapper.PersistToDomain, 'UniversityRepository');
  }

  async getPaginated(paginatorParams: PageParams, filter: {}): Promise<PaginatedFindResult<University>> {
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
        UniversityMapper.PersistToDomain(u),
      ),
      limit: pageLimit,
      currentPage,
      totalPages,
    };
  }
}