import { Column, Entity, Index } from 'typeorm';
import { BaseRestrictionPersistence } from './base-restriction.base-persistence';

@Entity('count_restrictions_persistence')
@Index(['id'], { unique: true })
export class CountRestrictionsPersistence extends BaseRestrictionPersistence {

  @Column({ type: 'int' })
  min: number;

  @Column({ type: 'int' })
  part: number;

  @Column({ type: 'text' })
  operator: string;
}
