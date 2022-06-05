import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { Student } from '../../../student/domain/entities/student.entity';
import { StudentPersistence } from '../../../student/infra/entities/student.persistence';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentMappers } from '../../../student/infra/mappers/student.mapper';
import { IStudentRepository } from '../../domain/interfaces/student.repository';

@Injectable()
export class StudentRepository extends BaseRepository<Student, StudentPersistence> implements IStudentRepository {
  constructor(@InjectRepository(StudentPersistence) _repository: Repository<StudentPersistence>) {
    super(_repository, StudentMappers.DomainToPersist, StudentMappers.PersistToDomain, 'StudentRepository');
  }

  async findDetails(id: string): Promise<Student> {
    const student = await this
      ._entityRepository
      .findOne(id, {
        relations: [
          'faculty',
          'faculty.university',
          'major',
        ],
      });

    return StudentMappers.PersistToDomain(student);
  }
}
