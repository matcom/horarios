import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityPersistence } from './infra/entities/university.persistence';
import { UniversityRepository } from './infra/repositories/university.repository';
import { UniversityController } from './presentation/controllers/university.controller';
import { UniversityUseCases } from './application/useCases';

@Module({
  imports: [DataAccessModule, TypeOrmModule.forFeature([UniversityPersistence])],
  providers: [...UniversityUseCases, UniversityRepository],
  exports: [],
  controllers: [UniversityController],
})
export class UniversityModule {
}