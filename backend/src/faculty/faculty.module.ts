import { Module } from '@nestjs/common';
import { FacultyController } from './presentation/controllers/faculty.controller';
import { FacultyUseCases } from './application/useCases';
import { FacultyRepository } from './infra/repositories/faculty.repository';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyPersistence } from './infra/entities/faculty.persistence';

@Module({
  imports: [DataAccessModule, TypeOrmModule.forFeature([FacultyPersistence])],
  providers: [...FacultyUseCases, FacultyRepository],
  exports: [],
  controllers: [FacultyController],
})
export class FacultyModule {
}