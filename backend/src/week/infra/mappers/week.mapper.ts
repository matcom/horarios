import { WeekPersistence } from '../entities/week.persistence';
import { Week } from '../../domain/entities/week.entity';
import { WeekDto } from '../../application/dtos/week.dto';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';

export class WeekMapper {
  public static PersistToDomain(persist: WeekPersistence): Week {
    const domain = Week.Create({
      ...persist,
    }, persist.id);

    // TODO: handle this
    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: Week): Partial<WeekPersistence> {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public static DomainToDto(domain: Week): WeekDto {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      duration: domain.duration,
      firstDay: domain.firstDay,
      endDay: domain.endDay,
      number: domain.number,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<Week>): PaginatedFindResult<WeekDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(WeekMapper.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }
}