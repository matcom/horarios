import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { Column, ManyToOne } from 'typeorm';
import { RestrictionType } from '../../domain/enums/restriction-type';
import { TeacherPersistence } from '../../../teacher/infra/entities/teacher.persistence';

export abstract class BaseRestrictionPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  conditions: string;

  @Column({ type: 'int' })
  interval: number;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'text', name: 'teacher_id' })
  teacherId: string;

  @Column({ type: 'enum', enum: RestrictionType, default: RestrictionType.Unknown })
  restrictionType: RestrictionType;
}