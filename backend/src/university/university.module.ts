import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { CreateUniversityUseCase } from './application/useCases/university.create.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityPersistence } from './infra/entities/university.persistence';
import { UniversityRepository } from './infra/repositories/university.repository';

@Module({
  imports: [DataAccessModule, TypeOrmModule.forFeature([UniversityPersistence])],
  providers: [CreateUniversityUseCase, UniversityRepository],
  exports: [],
})
export class UniversityModule {
}