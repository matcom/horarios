import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountRestrictionsPersistence } from './infra/entities/count-restrictions.persistence';
import { CountRestrictionsUseCases } from './application/useCases';
import { CountRestrictionsRepository } from './infra/repositories/count-restrictions.repository';
import { CountRestrictionsController } from './presentation/controllers/count-restrictions.controller';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([CountRestrictionsPersistence]),
    ClassModule
  ],
  providers: [...CountRestrictionsUseCases, CountRestrictionsRepository],
  exports: [],
  controllers: [CountRestrictionsController],
})
export class RestrictionsModule {
}