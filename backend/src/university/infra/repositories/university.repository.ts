import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { University } from '../../domain/entities/university.entity';
import { UniversityPersistence } from '../entities/university.persistence';
import { IUniversityRepository } from '../../domain/interfaces/IUniversityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UniversityMapper } from '../mappers/university.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UniversityRepository extends BaseRepository<University, UniversityPersistence> implements IUniversityRepository {
  constructor(@InjectRepository(UniversityPersistence) _repository: Repository<UniversityPersistence>) {
    super(_repository, UniversityMapper.DomainToPersist, UniversityMapper.PersistToDomain, 'UniversityRepository');
  }
}