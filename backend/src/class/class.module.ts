import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassPersistence } from './infra/entities/class.persistence';
import { ClassUseCases } from './application/useCases';
import { ClassRepository } from './infra/repositories/class.repository';
import { ClassController } from './presentation/controllers/class.controller';
import { FacultyModule } from '../faculty/faculty.module';

@Module({
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([ClassPersistence]),
    FacultyModule,
  ],
  providers: [...ClassUseCases, ClassRepository],
  exports: [],
  controllers: [ClassController],
})
export class ClassModule {
}

