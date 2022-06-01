import { MajorPersistence } from '../entities/major.persistence';
import { Major } from '../../domain/entities/major.entity';
import { MajorDto } from '../../application/dtos/major.dto';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';

export class MajorMappers {
  public static PersistToDomain(persist: MajorPersistence): Major {
    const domain = Major.Create({
      ...persist,
    }, persist.id);

    // TODO: handle this
    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: Major): Partial<MajorPersistence> {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      facultyId: domain.facultyId,
      duration: domain.duration,
    };
  }

  public static DomainToDto(domain: Major): MajorDto {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      duration: domain.duration,
      facultyId: domain.facultyId,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<Major>): PaginatedFindResult<MajorDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(MajorMappers.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }
}
