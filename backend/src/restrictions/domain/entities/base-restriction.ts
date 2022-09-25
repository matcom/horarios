import { DomainTimestamp } from '../../../shared/domain/domain.timestamp';
import { DomainEntity } from '../../../shared/domain/entity.abstract';
import { Teacher } from '../../../teacher/domain/entities/teacher.entity';
import { RestrictionType } from '../enums/restriction-type';

export type BaseRestrictionProps = DomainTimestamp & {
  conditions: string,
  interval: number,
  priority: number,
  teacherId: { id: string },
  teacher?: Teacher
  restrictionType: RestrictionType;
};

type newBaseRestrictionProps = Omit<BaseRestrictionProps,
  'id' | 'createdAt' | 'updatedAt'>;

export abstract class BaseRestriction<T> extends DomainEntity<T & BaseRestrictionProps> {
  get condition(): string {
    return this.props.conditions;
  }

  get interval(): number {
    return this.props.interval;
  }

  get priority(): number {
    return this.props.priority;
  }

  get teacherId(): { id: string } {
    return this.props.teacherId;
  }

  get teacher(): Teacher {
    return this.props.teacher;
  }

  get restrictionType(): RestrictionType {
    return this.props.restrictionType;
  }

  public abstract evaluate(): any;
}
