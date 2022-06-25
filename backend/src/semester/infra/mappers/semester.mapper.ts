import { SemesterPersistence } from '../entities/semester.persistence';
import { Semester } from '../../domain/entities/semester.entity';
import { SemesterDto } from '../../application/dtos/semester.dto';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';

export class SemesterMapper {
  public static PersistToDomain(persist: SemesterPersistence): Semester {
    const domain = Semester.Create({
      ...persist,
    }, persist.id);

    // TODO: handle this
    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: Semester): Partial<SemesterPersistence> {
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

  public static DomainToDto(domain: Semester): SemesterDto {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      duration: domain.duration,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<Semester>): PaginatedFindResult<SemesterDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(SemesterMapper.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }
}