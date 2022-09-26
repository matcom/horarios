import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimpleCountRestrictionsPersistence } from './infra/entities/simple-count-restrictions.persistence';
import { RestrictionsUseCases } from './application/useCases';
import { RestrictionsController } from './presentation/controllers/restrictions.controller';
import { ClassModule } from '../class/class.module';
import { CountConditionsRestrictionsPersistence } from './infra/entities/count-conditions.restrictions.persistence';
import { RestrictionsRepositories } from './infra/repositories';

@Module({
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([
      SimpleCountRestrictionsPersistence,
      CountConditionsRestrictionsPersistence]),
    ClassModule,
  ],
  providers: [
    ...RestrictionsUseCases,
    ...RestrictionsRepositories,
  ],
  exports: [],
  controllers: [RestrictionsController],
})
export class RestrictionsModule {
}