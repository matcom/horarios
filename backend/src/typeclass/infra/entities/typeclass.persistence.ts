import { Column, Entity, Index } from 'typeorm';
import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { EnumActivitieType } from '../../domain/enums/enum.activitie.type';

@Entity('typeclass')
@Index(['id'], { unique: true })
export class TypeclassPersistence extends PersistentEntity {
  @Column({ type: 'text' })
  shortName: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'enum', enum: EnumActivitieType, default: EnumActivitieType.CP })
  type: EnumActivitieType;

  @Column({ type: 'int' })
  duration: number;
}
