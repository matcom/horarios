import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { TeachActivity } from '../../../teachActivity/domain/entities/teachActivity.entity';
import { TeachActivityPersistence } from '../../../teachActivity/infra/entities/teachActivity.persistence';
import { ITeachActivityRepository } from '../../../teachActivity/domain/interfaces/ITeachActivityRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachActivityMapper } from '../../../teachActivity/infra/mappers/teachActivity.mapper';

@Injectable()
export class TeachActivityRepository extends BaseRepository<TeachActivity, TeachActivityPersistence> implements ITeachActivityRepository {
  constructor(@InjectRepository(TeachActivityPersistence) _repository: Repository<TeachActivityPersistence>) {
    super(_repository, TeachActivityMapper.DomainToPersist, TeachActivityMapper.PersistToDomain, 'TeachActivityRepository');
  }

  async findDetails(id: string): Promise<TeachActivity> {
    const teachActivity = await this
      ._entityRepository
      .findOne(id, {
        relations: [],
      });

    return TeachActivityMapper.PersistToDomain(teachActivity);
  }
}
