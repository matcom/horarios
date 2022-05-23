import {Column, Entity, Index, JoinColumn, ManyToOne} from 'typeorm';
import {PersistentEntity} from '../../../shared/modules/data-access/typeorm/base.entity';
import {UniversityPersistence} from '../../../university/infra/entities/university.persistence';

@Entity('local')
@Index(['id'], {unique: true})
export class LocalPersistence extends PersistentEntity {
    @Column({type: 'text'})
    shortName: string;

    @Column({type: 'text'})
    fullName: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'int'})
    priority: number;
}
