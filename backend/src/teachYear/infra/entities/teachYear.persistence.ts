import { Column, Entity, Index, OneToMany } from 'typeorm';
import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { FacultyPersistence } from '../../../faculty/infra/entities/faculty.persistence';

@Entity('teach_year')
@Index(['id'], { unique: true })
export class TeachYearPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'int' })
  duration: number;
}
