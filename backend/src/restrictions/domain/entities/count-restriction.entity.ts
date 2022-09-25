import { BaseRestriction, BaseRestrictionProps } from './base-restriction';
import { Result } from '../../../shared/core/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

type CountRestrictionProps = BaseRestrictionProps & {
  min: number;
  part: number;
  operator: string;
}

type newCountRestrictionProps = Omit<CountRestrictionProps,
  'id' | 'createdAt' | 'updatedAt'>;


export class CountRestrictions extends BaseRestriction<CountRestrictionProps> {

  get min(): number {
    return this.props.min;
  }

  get part(): number {
    return this.props.part;
  }

  get operator(): string {
    return this.props.operator;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public static New(props: newCountRestrictionProps): Result<CountRestrictions> {
    const ans: Result<CountRestrictions> = this.Create({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (ans.isFailure) return Result.Fail(ans.unwrapError());

    return Result.Ok(ans.unwrap());
  }

  public static Create(props: CountRestrictionProps, id: string = null): Result<CountRestrictions> {
    return Result.Ok(new CountRestrictions(props, new UniqueEntityID(id)));
  }

  public evaluate(): any {
    // this.props.con
  }
}