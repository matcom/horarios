import { IRepository } from './IRepository';
import Optional from '../Option';
import { WhereType } from '../types/base-where.type';
import { OrderByType } from '../types/base-orderBy.type';
import { PageParams } from '../PaginatorParams';
import { PaginatedFindResult } from '../PaginatedFindResult';
import { UniqueEntityID } from '../../domain/UniqueEntityID';
import { Result } from '../Result';

export interface IGenericRepository<E,
  FilterableFields,
  IncludesType extends string,
  > extends IRepository<E> {
  findById(
    id: UniqueEntityID,
    includes?: IncludesType[],
  ): Promise<Optional<E>> | Optional<E>;

  findOne(
    where?: WhereType<FilterableFields>,
    orderBy?: OrderByType<FilterableFields>,
    includes?: IncludesType[],
  ): Promise<Optional<E>> | Optional<E>;

  getAllPaginated(
    pageParams?: PageParams,
    where?: WhereType<FilterableFields>,
    orderBy?: OrderByType<FilterableFields>,
    includes?: IncludesType[],
  ): Promise<PaginatedFindResult<E>> | PaginatedFindResult<E>;

  exist(where: WhereType<FilterableFields>): Promise<boolean> | boolean;

  getAllIterable(
    where?: WhereType<FilterableFields>,
    orderBy?: OrderByType<FilterableFields>,
    includes?: IncludesType[],
    bashSize?: number,
  ): AsyncGenerator<Result<E>>;
}
