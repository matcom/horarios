import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { EnumPermits } from 'src/shared/domain/enum.permits';
import { EnumStatus } from 'src/user/domain/enums/enum.status';

@Entity('user')
@Index(['id'], { unique: true })
export class UserPersistence extends PersistentEntity {
    @Column({ type: 'text' })
    shortName: string;

    @Column({ type: 'text' })
    fullName: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'number' })
    priority: number;

    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'simple-array' })
    roles: EnumPermits[]

    @Column({ type: 'text' })
    status: EnumStatus


}