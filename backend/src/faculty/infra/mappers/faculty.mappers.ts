import { FacultyPersistence } from '../entities/faculty.entity';
import { Faculty } from '../../domain/entities/faculty.entity';

export class FacultyMappers {
  public static PersistToDomain(persist: FacultyPersistence): Faculty {
    const domain = Faculty.Create({
      ...persist,
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

  public static DomainToDto(dto) {
  }
}