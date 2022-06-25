import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { FacultyPersistence } from '../../../faculty/infra/entities/faculty.persistence';

@Entity('week')
@Index(['id'], { unique: true })
export class WeekPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'float' })
  duration: number;

  @Column({ type: 'text' })
  firstDay: string;

  @Column({ type: 'text' })
  endDay: string;

  @Column({ type: 'int' })
  number: number;
}
