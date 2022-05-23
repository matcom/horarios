import { Column, Entity, Index, OneToMany } from 'typeorm';
import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { TeacherFacultyPersistence } from '../../../teacherFaculty/infra/entities/teacherFaculty.persistence';

@Entity('teacher')
@Index(['id'], { unique: true })
export class TeacherPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'text' })
  email: string;

  @OneToMany(
    () => TeacherFacultyPersistence,
    f => f.teacher,
    { cascade: ['remove', 'update'], eager: true },
  )
  teacherFaculties: TeacherFacultyPersistence[];
}
