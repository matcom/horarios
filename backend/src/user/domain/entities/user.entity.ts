import { DomainEntity } from '../../../shared/domain/entity.abstract';
import { Result } from '../../../shared/core/Result';
import { EnumPermits } from 'src/shared/domain/enum.permits';
import { Guard } from 'src/shared/core/Guard';
import { AppError } from 'src/shared/core/errors/AppError';
import { EnumStatus } from '../enums/enum.status';
import { hashSync } from 'bcrypt';

type UserProps = {
    username:string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    roles: EnumPermits[];
    status: EnumStatus;
};

type newUserProps = Omit<UserProps,
    'id' | 'createdAt' | 'updatedAt'>;

export class User extends DomainEntity<UserProps> {
  
    get username(): string {
        return this.props.username;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }
    get email(): string {
        return this.props.email
    }
    get password(): string {
        return this.props.password
    }
    get roles(): EnumPermits[] {
        return this.props.roles
    }
    get status(): EnumStatus {
        return this.props.status
    }

    public static New(props: newUserProps): Result<User> {
        const ans: Result<User> = this.Create({
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        if (ans.isFailure) return Result.Fail(ans.unwrapError());

        return Result.Ok(ans.unwrap());
    }

    public static Create(props: UserProps): Result<User> {
        // set guards here

        const shortNameOrError = Guard.againstAtLeast({ argumentPath: 'shortname', numChars: 3, argument: props.username })
        if (!shortNameOrError) {
            return Result.Fail(new AppError.ValidationError(shortNameOrError.message))
        }


        const passwordOrError = Guard.againstAtLeast({ argumentPath: 'password', numChars: 5, argument: props.password })
        if (passwordOrError) {
            return Result.Fail(new AppError.ValidationError(passwordOrError.message))
        }

        return Result.Ok(new User(props));
    }
    public setPasswordHash(password: string) {
        this.props.password = hashSync(password, 5)
    }

    public Update(props: newUserProps) {
        // this.props.name = props.name ?? this.props.name;
    }
}
