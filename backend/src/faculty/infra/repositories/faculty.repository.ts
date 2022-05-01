import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { Faculty } from '../../domain/entities/faculty.entity';
import { FacultyPersistence } from '../entities/faculty.persistence';
import { IFacultyRepository } from '../../domain/interfaces/IFacultyRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacultyMappers } from '../mappers/faculty.mappers';

@Injectable()
export class FacultyRepository extends BaseRepository<Faculty, FacultyPersistence> implements IFacultyRepository {
  constructor(@InjectRepository(FacultyPersistence) _repository: Repository<FacultyPersistence>) {
    super(_repository, FacultyMappers.DomainToPersist, FacultyMappers.PersistToDomain, 'FacultyRepository');
  }
}