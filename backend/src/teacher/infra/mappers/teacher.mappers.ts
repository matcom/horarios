import { TeacherPersistence } from '../entities/teacher.persistence';
import { Teacher } from '../../domain/entities/teacher.entity';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { TeacherDto } from '../../application/dtos/teacher.dto';
import { TeacherDetailsDto } from '../../application/dtos/teacher.details.dto';
import { FacultyMappers } from '../../../faculty/infra/mappers/faculty.mappers';

export class TeacherMappers {
  public static PersistToDomain(persist: TeacherPersistence): Teacher {
    const domain = Teacher.Create({
      ...persist,
      faculties:
        persist.faculties ? persist.faculties.map(f => FacultyMappers.PersistToDomain(f)) : [],
    }, persist.id);

    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }


  public static DomainToPersist(domain: Teacher): Partial<TeacherPersistence> {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      email: domain.email,
      faculties: domain.facultyIds,
    };
  }

  public static DomainToDto(domain: Teacher): TeacherDto {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      email: domain.email,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<Teacher>): PaginatedFindResult<TeacherDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(TeacherMappers.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }

  public static DomainToDetails(domain: Teacher): TeacherDetailsDto {
    let base = TeacherMappers.DomainToDto(domain);

    return {
      ...base,
      faculties: domain.faculties ? domain.faculties.map(f => FacultyMappers.DomainToDto(f)) : [],
    };
  }
}