import { StudentPersistence } from '../../../student/infra/entities/student.persistence';
import { Student } from '../../../student/domain/entities/student.entity';
import { FacultyMappers } from '../../../faculty/infra/mappers/faculty.mappers';
import { StudentDto } from '../../../student/application/dtos/student.dto';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { StudentDetailsDto } from '../../../student/application/dtos/student.details.dto';
import { MajorMappers } from '../../../major/infra/mappers/major.mappers';

export class StudentMappers {
  public static PersistToDomain(persist: StudentPersistence): Student {
    const domain = Student.Create({
      ...persist,
      faculty: persist.faculty ? FacultyMappers.PersistToDomain(persist.faculty) : null,
      major: persist.major ? MajorMappers.PersistToDomain(persist.major) : null,
    }, persist.id);

    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }


  public static DomainToPersist(domain: Student): Partial<StudentPersistence> {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      email: domain.email,
      facultyId: { id: domain.facultyId },
      majorId: { id: domain.majorId },
      year: domain.year,
    };
  }

  public static DomainToDto(domain: Student): StudentDto {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      email: domain.email,
      year: domain.year,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<Student>): PaginatedFindResult<StudentDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(StudentMappers.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }

  public static DomainToDetails(domain: Student): StudentDetailsDto {
    let base = StudentMappers.DomainToDto(domain);

    return {
      ...base,
      faculty: domain.faculty ? FacultyMappers.DomainToDto(domain.faculty) : null,
      major: domain.major ? MajorMappers.DomainToDto(domain.major) : null,
    };
  }
}
