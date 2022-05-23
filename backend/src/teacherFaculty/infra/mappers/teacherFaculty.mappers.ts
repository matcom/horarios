import { TeacherFacultyPersistence } from '../entities/teacherFaculty.persistence';
import { TeacherFaculty } from '../../domain/entities/teacherFaculty.entity';

export class TeacherFacultyMappers {
  public static PersistToDomain(persist: TeacherFacultyPersistence): TeacherFaculty {
    throw new Error('Not implemented');
  }

  public static DomainToPersist(domain: TeacherFaculty): TeacherFacultyPersistence {
    throw new Error('Not implemented');
  }
}