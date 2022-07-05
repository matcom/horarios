import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { FacultyPersistence } from '../../../faculty/infra/entities/faculty.persistence';
import { MajorPersistence } from '../../../major/infra/entities/major.persistence';

@Entity('group')
@Index(['id'], { unique: true })
export class GroupPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'text', name: 'major_id' })
  majorId: string;

  @ManyToOne(
    () => MajorPersistence,
    major => major.groups,
    { nullable: true },
  )
  @JoinColumn({ name: 'major_id' })
  major: MajorPersistence | any;
}
