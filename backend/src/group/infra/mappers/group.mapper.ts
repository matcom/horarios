import { GroupPersistence } from '../entities/group.persistence';
import { Group } from '../../domain/entities/group.entity';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { GroupDto } from '../../application/dtos/group.dto';
import { GroupDetailsDto } from '../../application/dtos/group.details.dto';
import { FacultyMappers } from '../../../faculty/infra/mappers/faculty.mappers';
import { MajorMappers } from '../../../major/infra/mappers/major.mappers';

export class GroupMappers {
  public static PersistToDomain(persist: GroupPersistence): Group {
    const domain = Group.Create({
      ...persist,
      major:
        persist.major ? MajorMappers.PersistToDomain(persist.major) : null,
      majorId: { id: persist.majorId },
    }, persist.id);

    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }


  public static DomainToPersist(domain: Group): Partial<GroupPersistence> {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      major: domain.majorId,
      year: domain.year,
    };
  }

  public static DomainToDto(domain: Group): GroupDto {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      majorId: domain.majorId.id,
      year: domain.year,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<Group>): PaginatedFindResult<GroupDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(GroupMappers.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }

  public static DomainToDetails(domain: Group): GroupDetailsDto {
    let base = GroupMappers.DomainToDto(domain);

    return {
      ...base,
      major: domain.major ? MajorMappers.DomainToDto(domain.major) : null,
    };
  }
}
