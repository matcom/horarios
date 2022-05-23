import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherFaculty } from '../../domain/entities/teacherFaculty.entity';
import { TeacherFacultyPersistence } from '../entities/teacherFaculty.persistence';
import { TeacherFacultyMappers } from '../mappers/teacherFaculty.mappers';
import { ITeacherFacultyRepository } from '../../domain/interfaces/ITeacherFacultyRepository';

@Injectable()
export class TeacherFacultyRepository extends BaseRepository<TeacherFaculty, TeacherFacultyPersistence> implements ITeacherFacultyRepository {
  constructor(@InjectRepository(TeacherFacultyPersistence) _repository: Repository<TeacherFacultyPersistence>) {
    super(_repository, TeacherFacultyMappers.DomainToPersist, TeacherFacultyMappers.PersistToDomain, 'TeacherFacultyRepository');
  }
}
