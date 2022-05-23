import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { FacultyPersistence } from '../../../faculty/infra/entities/faculty.persistence';
import { TeacherPersistence } from '../../../teacher/infra/entities/teacher.persistence';

@Entity('teacher_faculty')
@Index(['id'], { unique: true })
export class TeacherFacultyPersistence extends PersistentEntity {

  @Column({ type: 'text', name: 'faculty_id' })
  facultyId: string;

  @ManyToOne(
    () => FacultyPersistence,
    faculty => faculty.teacherFaculties,
    { eager: true },
  )
  @JoinColumn({ name: 'faculty_id' })
  faculty: FacultyPersistence;

  @Column({ type: 'text', name: 'teacher_id' })
  teacherId: string;

  @ManyToOne(() => TeacherPersistence,
    teacher => teacher.teacherFaculties,
    { eager: true })
  teacher: TeacherPersistence;
}
