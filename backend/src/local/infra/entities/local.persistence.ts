import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { FacultyPersistence } from '../../../faculty/infra/entities/faculty.persistence';
import { LessonPersistence } from '../../../lesson/infra/entities/lesson.persistence';

@Entity('local')
@Index(['id'], { unique: true })
export class LocalPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'text', name: 'faculty_id' })
  facultyId: string;

  @ManyToOne(
    () => FacultyPersistence,
    faculty => faculty.locals,
    {})
  @JoinColumn({ name: 'faculty_id' })
  faculty: FacultyPersistence;

  @OneToOne(
    () => LessonPersistence,
    lesson => lesson.local,
    { nullable: true })
  lesson: LessonPersistence;
}
