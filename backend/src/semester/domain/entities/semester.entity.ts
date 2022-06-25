import { DomainEntity } from '../../../shared/domain/entity.abstract';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { DomainBaseProps } from '../../../shared/domain/domain.base-props';
import { DomainTimestamp } from '../../../shared/domain/domain.timestamp';

type SemesterProps = DomainBaseProps & DomainTimestamp & {
  duration: number;
};

type newSemesterProps = Omit<SemesterProps,
  'id' | 'createdAt' | 'updatedAt'>;

export class Semester extends DomainEntity<SemesterProps> {

  get duration(): number {
    return this.props.duration;
  }

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

  public static New(props: newSemesterProps): Result<Semester> {
    const ans: Result<Semester> = this.Create({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (ans.isFailure) return Result.Fail(ans.unwrapError());

    return Result.Ok(ans.unwrap());
  }

  public static Create(props: SemesterProps, id: string = null): Result<Semester> {
    // set guards here
    return Result.Ok(new Semester(props, new UniqueEntityID(id)));
  }

  public Update(props: any) {
    this.props.priority = props.priority ?? this.props.priority;
    this.props.description = props.description ?? this.props.description;
    this.props.fullName = props.fullName ?? this.props.fullName;
    this.props.duration = props.duration ?? this.props.duration;
    this.props.shortName = props.shortName ?? this.props.shortName;

    this.props.updatedAt = new Date();
  }
}
