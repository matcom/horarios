import { FacultyPersistence } from '../entities/faculty.persistence';
import { Faculty } from '../../domain/entities/faculty.entity';
import { FacultyDto } from '../../application/dtos/faculty.dto';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { UniversityMapper } from '../../../university/infra/mappers/university.mapper';
import { FindAllResult } from '../../../shared/core/FindAllResult';
import { FacultyDetailsDto } from '../../application/dtos/facultyDetailsDto';

export class FacultyMappers {
  public static PersistToDomain(persist: FacultyPersistence): Faculty {
    const domain = Faculty.Create({
      ...persist,
      university: persist.university ? UniversityMapper.PersistToDomain(persist.university) : null,
    }, persist.id);

    // TODO: handle this
    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: Faculty): Partial<FacultyPersistence> {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      universityId: domain.universityId,
    };
  }

  public static DomainToDto(domain: Faculty): FacultyDto {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      universityId: domain.universityId,
      university: domain.university ? UniversityMapper.DomainToDto(domain.university) : null,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<Faculty>): PaginatedFindResult<FacultyDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(FacultyMappers.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }

  public static AllToDto(all: FindAllResult<Faculty>): FindAllResult<FacultyDto> {
    return {
      items: all.items.map(FacultyMappers.DomainToDto),
    };
  }


  public static DomainToDetails(domain: Faculty): FacultyDetailsDto {
    let base = FacultyMappers.DomainToDto(domain);

    return {
      ...base,
      university: domain.university ? UniversityMapper.DomainToDto(domain.university) : null,
    };
  }
}