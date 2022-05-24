import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../domain/entities/teacher.entity';
import { TeacherPersistence } from '../entities/teacher.persistence';
import { TeacherMappers } from '../mappers/teacher.mappers';
import { ITeacherRepository } from '../../domain/interfaces/ITeacherRepository';

@Injectable()
export class TeacherRepository extends BaseRepository<Teacher, TeacherPersistence> implements ITeacherRepository {
  constructor(@InjectRepository(TeacherPersistence) _repository: Repository<TeacherPersistence>) {
    super(_repository, TeacherMappers.DomainToPersist, TeacherMappers.PersistToDomain, 'FacultyRepository');
  }
}
