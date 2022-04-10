import { PersistentEntity } from '../../../shared/modules/data-access/typeorm/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('university')
@Index(['id'], { unique: true })
export class UniversityPersistence extends PersistentEntity {
  @Column({ type: 'varchar' })
  shortName: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'number' })
  priority: number;
}