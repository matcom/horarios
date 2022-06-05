import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { TypeClass } from '../../domain/entities/typeclass.entity';
import { TypeclassPersistence } from '../entities/typeclass.persistence';
import { ITypeClassRepository } from '../../domain/interfaces/ITypeClassRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeclassMappers } from '../mappers/typeclass.mappers';

@Injectable()
export class TypeclassRepository extends BaseRepository<TypeClass, TypeclassPersistence> implements ITypeClassRepository {
  constructor(@InjectRepository(TypeclassPersistence) _repository: Repository<TypeclassPersistence>) {
    super(_repository, TypeclassMappers.DomainToPersist, TypeclassMappers.PersistToDomain, 'TypeclassRepository');
  }
}
