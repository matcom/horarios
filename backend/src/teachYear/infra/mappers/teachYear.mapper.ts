import { TeachYearPersistence } from '../entities/teachYear.persistence';
import { TeachYear } from '../../domain/entities/teachYear.entity';
import { TeachYearDto } from '../../application/dtos/teachYear.dto';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Teacher } from '../../../teacher/domain/entities/teacher.entity';
import { TeacherDetailsDto } from '../../../teacher/application/dtos/teacher.details.dto';
import { FacultyMappers } from '../../../faculty/infra/mappers/faculty.mappers';
import { TeachYearDetailsDto } from '../../application/dtos/teachYear.details.dto';

export class TeachYearMapper {
  public static PersistToDomain(persist: TeachYearPersistence): TeachYear {
    const domain = TeachYear.Create({
      ...persist,
    }, persist.id);

    // TODO: handle this
    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: TeachYear): Partial<TeachYearPersistence> {
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

  public static DomainToDto(domain: TeachYear): TeachYearDto {
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

  public static PaginatedToDto(pag: PaginatedFindResult<TeachYear>): PaginatedFindResult<TeachYearDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(TeachYearMapper.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }


  public static DomainToDetails(domain: TeachYear): TeachYearDetailsDto {
    let base = TeachYearMapper.DomainToDto(domain);

    return {
      ...base,
    };
  }
}
