import { UniversityPersistence } from '../entities/university.persistence';
import { University } from '../../domain/entities/university.entity';
import { UniversityDto } from '../../application/dtos/university.dto';

export class UniversityMapper {
  public static PersistToDomain(persist: UniversityPersistence): University {
    const domain = University.Create({
      ...persist,
    });

    // TODO: handle this
    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: University): Partial<UniversityPersistence> {
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

  public static DomainToDto(domain: University): UniversityDto {
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
}