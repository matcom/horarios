import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { UniversityPersistence } from '../../../university/infra/entities/university.persistence';

@Entity('faculty')
@Index(['id'], { unique: true })
export class FacultyPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'text', name: 'university_id' })
  universityId: string;

  @ManyToOne(
    () => UniversityPersistence,
    university => university.faculties,
    { cascade: ['remove', 'update'] },
  )
  @JoinColumn({ name: 'university_id' })
  university: UniversityPersistence;
}