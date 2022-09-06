import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { FacultyPersistence } from '../../../faculty/infra/entities/faculty.persistence';
import { LessonPersistence } from '../../../lesson/infra/entities/lesson.persistence';
import { DepartmentPersistence } from '../../../department/infra/entities/department.persistence';
import { ClassPersistence } from '../../../class/infra/entities/class.persistence';

@Entity('teacher')
@Index(['id'], { unique: true })
export class TeacherPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', default: 1 })
  priority: number;

  @Column({ type: 'text' })
  email: string;

  @ManyToMany(
    () => FacultyPersistence,
    f => f.teachers,
    { cascade: ['update'] },
  )
  @JoinTable()
  faculties: FacultyPersistence[] | any;

  @ManyToOne(() => LessonPersistence,
    lesson => lesson.teacher,
    { nullable: true })
  lesson: LessonPersistence[];

  @Column({ type: 'text', name: 'department_id' })
  departmentId?: string;

  @ManyToOne(
    () => DepartmentPersistence,
    department => department.teachers,
    { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentPersistence | any;

  @ManyToMany(
    () => ClassPersistence,
    c => c.teachers,
    {},
  )
  classes: ClassPersistence[] | any;
}
