import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentPersistence } from '../entities/department.persistence';
import { DepartmentMappers } from '../mappers/department.mappers';
import { Department } from '../../domain/entities/department.entity';
import { IDepartmentRepository } from '../../domain/interfaces/IDepartmentRepository';

@Injectable()
export class DepartmentRepository extends BaseRepository<Department, DepartmentPersistence> implements IDepartmentRepository {
  constructor(@InjectRepository(DepartmentPersistence) _repository: Repository<DepartmentPersistence>) {
    super(_repository, DepartmentMappers.DomainToPersist, DepartmentMappers.PersistToDomain, 'DepartmentRepository');
  }

  async findDetails(id: string): Promise<Department> {
    const department = await this
      ._entityRepository
      .findOne(id, {
        relations: ['teachers', 'faculty'],
      });

    return DepartmentMappers.PersistToDomain(department);
  }
}
