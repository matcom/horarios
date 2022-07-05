import { TeachActivityPersistence } from '../entities/teachActivity.persistence';
import { TeachActivity } from '../../domain/entities/teachActivity.entity';
import { TeachActivityDto } from '../../application/dtos/teachActivity.dto';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { Teacher } from '../../../teacher/domain/entities/teacher.entity';
import { TeacherDetailsDto } from '../../../teacher/application/dtos/teacher.details.dto';
import { FacultyMappers } from '../../../faculty/infra/mappers/faculty.mappers';
import { TeachActivityDetailsDto } from '../../application/dtos/teachActivity.details.dto';

export class TeachActivityMapper {
  public static PersistToDomain(persist: TeachActivityPersistence): TeachActivity {
    const domain = TeachActivity.Create({
      ...persist,
    }, persist.id);

    // TODO: handle this
    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: TeachActivity): Partial<TeachActivityPersistence> {
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

  public static DomainToDto(domain: TeachActivity): TeachActivityDto {
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

  public static PaginatedToDto(pag: PaginatedFindResult<TeachActivity>): PaginatedFindResult<TeachActivityDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(TeachActivityMapper.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }


  public static DomainToDetails(domain: TeachActivity): TeachActivityDetailsDto {
    let base = TeachActivityMapper.DomainToDto(domain);

    return {
      ...base,
    };
  }
}
