import {BaseRepository} from '../../../shared/modules/data-access/typeorm/base.respository';
import {Major} from '../../domain/entities/major.entity';
import {MajorPersistence} from '../entities/major.persistence';
import {IMajorRepository} from '../../domain/interfaces/IMajorRepository';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MajorMappers} from '../mappers/major.mappers';

@Injectable()
export class MajorRepository extends BaseRepository<Major, MajorPersistence> implements IMajorRepository {
    constructor(@InjectRepository(MajorPersistence) _repository: Repository<MajorPersistence>) {
        super(_repository, MajorMappers.DomainToPersist, MajorMappers.PersistToDomain, 'MajorRepository');
    }
}
