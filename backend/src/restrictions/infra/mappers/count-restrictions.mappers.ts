import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { SimpleCountRestrictionsPersistence } from '../entities/simple-count-restrictions.persistence';
import { SimpleCountRestrictions } from '../../domain/entities/count-restriction.entity';
import { CountRestrictionsDto } from '../../application/dtos/count-restrictions/count-restrictions.dto';

export class CountRestrictionsMappers {
  public static PersistToDomain(persist: SimpleCountRestrictionsPersistence): SimpleCountRestrictions {
    const domain = SimpleCountRestrictions.Create({
      ...persist,
      conditions: JSON.parse(persist.conditions),
      teacherId: { id: persist.teacherId },
    }, persist.id);

    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }


  public static DomainToPersist(domain: SimpleCountRestrictions): Partial<SimpleCountRestrictionsPersistence> {
    return {
      id: domain._id.toString(),
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      restrictionType: domain.restrictionType,
      teacherId: domain.teacherId.id,
      conditions: JSON.stringify(domain.condition),
      min: domain.min,
      interval: domain.interval,
      part: domain.part,
      operator: domain.operator,
    };
  }

  public static DomainToDto(domain: SimpleCountRestrictions): CountRestrictionsDto {
    return {
      id: domain._id.toString(),
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      conditions: domain.condition,
      min: domain.min,
      interval: domain.interval,
      part: domain.part,
      teacherId: domain.teacherId,
      operator: domain.operator,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<SimpleCountRestrictions>): PaginatedFindResult<CountRestrictionsDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(CountRestrictionsMappers.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }

  public static DomainToDetails(domain: SimpleCountRestrictions): CountRestrictionsDto {
    let base = CountRestrictionsMappers.DomainToDto(domain);

    return {
      ...base,
    };
  }
}