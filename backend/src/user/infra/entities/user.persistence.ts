import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { EnumPermits } from 'src/shared/domain/enum.permits';

@Entity('user')
@Index(['id'], { unique: true })
export class UserPersistence extends PersistentEntity {
    @Column({ type: 'varchar' })
    shortName: string;

    @Column({ type: 'varchar' })
    fullName: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'number' })
    priority: number;

    @Column({ type: 'varchar' })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'simple-array' })
    roles: EnumPermits[]


}