import { DomainEntity } from '../../../shared/domain/entity.abstract';
import { Result } from '../../../shared/core/Result';

type UniversityProps = {
  shortName: string;
  fullName: string;
  description: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
};

type newUniversityProps = Omit<UniversityProps,
  'id' | 'createdAt' | 'updatedAt'>;

export class University extends DomainEntity<UniversityProps> {
  get shortName(): string {
    return this.props.shortName;
  }

  get fullName(): string {
    return this.props.fullName;
  }

  get description(): string {
    return this.props.description;
  }

  get priority(): number {
    return this.props.priority;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static New(props: newUniversityProps): Result<University> {
    const ans: Result<University> = this.Create({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (ans.isFailure) return Result.Fail(ans.unwrapError());

    return Result.Ok(ans.unwrap());
  }

  public static Create(props: UniversityProps): Result<University> {
    // set guards here
    return Result.Ok(new University(props));
  }

  public Update(props: newUniversityProps) {
    // this.props.name = props.name ?? this.props.name;
  }
}
