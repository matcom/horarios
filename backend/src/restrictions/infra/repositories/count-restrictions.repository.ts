import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/modules/data-access/typeorm/base.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountRestrictionsPersistence } from '../entities/count-restrictions.persistence';
import { CountRestrictions } from '../../domain/entities/count-restriction.entity';
import { CountRestrictionsMappers } from '../mappers/count-restrictions.mappers';
import { ICountRestrictionsRepository } from '../../domain/interfaces/ICountRestrictionsRepository';

@Injectable()
export class CountRestrictionsRepository extends BaseRepository<CountRestrictions, CountRestrictionsPersistence> implements ICountRestrictionsRepository {
  constructor(@InjectRepository(CountRestrictionsPersistence) _repository: Repository<CountRestrictionsPersistence>) {
    super(_repository, CountRestrictionsMappers.DomainToPersist, CountRestrictionsMappers.PersistToDomain, 'CountRestrictionsRepository');
  }

  async findDetails(id: string): Promise<CountRestrictions> {
    const countRestrictions = await this
      ._entityRepository
      .findOne(id, {
        // relations: [
        //   'faculty',
        //   'faculty.university',
        //   'major',
        // ],
      });

    return CountRestrictionsMappers.PersistToDomain(countRestrictions);
  }
}
