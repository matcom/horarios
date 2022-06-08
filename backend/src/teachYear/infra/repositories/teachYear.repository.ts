import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { TeachYear } from '../../../teachYear/domain/entities/teachYear.entity';
import { TeachYearPersistence } from '../../../teachYear/infra/entities/teachYear.persistence';
import { ITeachYearRepository } from '../../../teachYear/domain/interfaces/ITeachYearRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachYearMapper } from '../../../teachYear/infra/mappers/teachYear.mapper';

@Injectable()
export class TeachYearRepository extends BaseRepository<TeachYear, TeachYearPersistence> implements ITeachYearRepository {
  constructor(@InjectRepository(TeachYearPersistence) _repository: Repository<TeachYearPersistence>) {
    super(_repository, TeachYearMapper.DomainToPersist, TeachYearMapper.PersistToDomain, 'TeachYearRepository');
  }

  async findDetails(id: string): Promise<TeachYear> {
    const teachYear = await this
      ._entityRepository
      .findOne(id, {
        relations: [],
      });

    return TeachYearMapper.PersistToDomain(teachYear);
  }
}
