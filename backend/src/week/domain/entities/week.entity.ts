import { DomainEntity } from '../../../shared/domain/entity.abstract';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { DomainBaseProps } from '../../../shared/domain/domain.base-props';
import { DomainTimestamp } from '../../../shared/domain/domain.timestamp';

type WeekProps = DomainBaseProps & DomainTimestamp & {
  duration: number;
  firstDay?: string;
  endDay?: string;
  number?: number;
};

type newWeekProps = Omit<WeekProps,
  'id' | 'createdAt' | 'updatedAt'>;

export class Week extends DomainEntity<WeekProps> {

  get duration(): number {
    return this.props.duration;
  }

  get firstDay(): string {
    return this.props.firstDay;
  }

  get endDay(): string {
    return this.props.endDay;
  }

  get number(): number {
    return this.props.number;
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

  public static New(props: newWeekProps): Result<Week> {
    const ans: Result<Week> = this.Create({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (ans.isFailure) return Result.Fail(ans.unwrapError());

    return Result.Ok(ans.unwrap());
  }

  public static Create(props: WeekProps, id: string = null): Result<Week> {
    // set guards here
    return Result.Ok(new Week(props, new UniqueEntityID(id)));
  }

  public Update(props: any) {
    this.props.priority = props.priority ?? this.props.priority;
    this.props.description = props.description ?? this.props.description;
    this.props.fullName = props.fullName ?? this.props.fullName;
    this.props.duration = props.duration ?? this.props.duration;
    this.props.shortName = props.shortName ?? this.props.shortName;
    this.props.firstDay = props.firstDay ?? this.props.firstDay;
    this.props.endDay = props.endDay ?? this.props.endDay;
    this.props.number = props.number ?? this.props.number;

    this.props.updatedAt = new Date();
  }
}
