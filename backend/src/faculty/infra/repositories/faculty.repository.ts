import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { Faculty } from '../../domain/entities/faculty.entity';
import { LocalPersistence } from '../entities/faculty.persistence';
import { IFacultyRepository } from '../../domain/interfaces/IFacultyRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacultyMappers } from '../mappers/faculty.mappers';

@Injectable()
export class FacultyRepository extends BaseRepository<Faculty, LocalPersistence> implements IFacultyRepository {
  constructor(@InjectRepository(LocalPersistence) _repository: Repository<LocalPersistence>) {
    super(_repository, FacultyMappers.DomainToPersist, FacultyMappers.PersistToDomain, 'FacultyRepository');
  }
}
