import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterPersistence } from './infra/entities/semester.persistence';
import { SemesterRepository } from './infra/repositories/semester.repository';
import { SemesterController } from './presentation/controllers/semester.controller';
import { SemesterUseCases } from './application/useCases';

@Module({
  imports: [DataAccessModule, TypeOrmModule.forFeature([SemesterPersistence])],
  providers: [...SemesterUseCases, SemesterRepository],
  exports: [],
  controllers: [SemesterController],
})
export class SemesterModule {
}