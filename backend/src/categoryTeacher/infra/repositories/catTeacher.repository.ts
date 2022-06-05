import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatTeacher } from '../../domain/entities/catTeacher.entity';
import { ICatTeacherRepository } from '../../domain/interfaces/ICatTeacherRepository';
import { CatTeacherPersistence } from '../../infra/entities/catTeacher.persistence';
import { CatTeacherMapper } from '../mappers/catTeacher.mapper';

@Injectable()
export class CatTeacherRepository extends BaseRepository<CatTeacher, CatTeacherPersistence> implements ICatTeacherRepository {
  constructor(@InjectRepository(CatTeacherPersistence) _repository: Repository<CatTeacherPersistence>) {
    super(_repository, CatTeacherMapper.DomainToPersist, CatTeacherMapper.PersistToDomain, 'CatTeacherRepository');
  }
}
