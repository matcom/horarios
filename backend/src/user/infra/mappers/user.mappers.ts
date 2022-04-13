import { User } from "src/user/domain/entities/user.entity";
import { UserPersistence } from "../entities/user.persistence";
import { hashSync } from 'bcrypt'


export class UserMapper {
    public static PersistToDomain(persist: UserPersistence): User {
        const domain = User.Create({
            ...persist,
        });

        // TODO: handle this
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
            roles: domain.roles,
            password: domain.password,
            status: domain.status
        };
    }
}