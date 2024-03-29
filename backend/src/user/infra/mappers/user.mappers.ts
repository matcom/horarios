import { User } from 'src/user/domain/entities/user.entity';
import { UserPersistence } from '../entities/user.persistence';
import { UserDto } from '../../application/dtos/user.dto';
import { PaginatedFindResult } from '../../../shared/core/PaginatedFindResult';
import { FindAllResult } from '../../../shared/core/FindAllResult';


export class UserMapper {
  public static PersistToDomain(persist: UserPersistence): User {

    if (!persist) return null;

    const domain = User.Create({
      ...persist,
    }, persist?.id);

    if (domain.isFailure)
      throw new Error(domain.unwrapError().message);

    return domain.unwrap();
  }

  public static DomainToPersist(domain: User): Partial<UserPersistence> {

    return {
      id: domain._id.toString(),
      username: domain.username,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      email: domain.email,
      permissions: domain.permissions,
      password: domain.password,
      status: domain.status,
    };
  }

  public static DomainToDto(domain: User): UserDto {
    return {
      id: domain._id.toString(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      permissions: domain.permissions,
      status: domain.status,
      email: domain.email,
      username: domain.username,
    };
  }

  public static PaginatedToDto(pag: PaginatedFindResult<User>): PaginatedFindResult<UserDto> {
    return {
      items: pag.items.length > 0 ? pag.items.map(UserMapper.DomainToDto) : [],
      limit: pag.limit,
      totalPages: pag.totalPages,
      currentPage: pag.currentPage,
    };
  }

  public static AllToDto(all: FindAllResult<User>): FindAllResult<UserDto> {
    return {
      items: all.items.map(UserMapper.DomainToDto),
    };
  }

}