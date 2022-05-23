import {BaseRepository} from '../../../shared/modules/data-access/typeorm/base.respository';
import {Local} from '../../domain/entities/local.entity';
import {LocalPersistence} from '../entities/local.persistence';
import {ILocalRepository} from '../../domain/interfaces/ILocalRepository';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {LocalMappers} from '../mappers/local.mappers';

@Injectable()
export class LocalRepository extends BaseRepository<Local, LocalPersistence> implements ILocalRepository {
    constructor(@InjectRepository(LocalPersistence) _repository: Repository<LocalPersistence>) {
        super(_repository, LocalMappers.DomainToPersist, LocalMappers.PersistToDomain, 'LocalRepository');
    }
}
