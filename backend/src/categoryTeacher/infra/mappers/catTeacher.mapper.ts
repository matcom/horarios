import { CatTeacher } from 'src/categoryTeacher/domain/entities/catTeacher.entity';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { CatTeacherPersistence } from '../entities/catTeacher.persistence';
import { CatTeacherDto } from '../../application/dtos/catTeacher.dto';

export class CatTeacherMapper {
  public static PersistToDomain(persist: CatTeacherPersistence): CatTeacher {
    const domain = CatTeacher.Create({
      ...persist,
    }, persist.id);

    // TODO: handle this
    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: CatTeacher): Partial<CatTeacherPersistence> {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      categoryName: domain.categoryName,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public static DomainToDto(domain: CatTeacher): CatTeacherDto {
    return {
      id: domain._id.toString(),
      shortName: domain.shortName,
      fullName: domain.fullName,
      description: domain.description,
      priority: domain.priority,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      categoryName: domain.categoryName,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<CatTeacher>): PaginatedFindResult<CatTeacherDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(CatTeacherMapper.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }
}
