import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentPersistence } from './infra/entities/department.persistence';
import { DepartmentUseCases } from './application/useCases';
import { DepartmentRepository } from './infra/repositories/department.repository';
import { DepartmentController } from './presentation/controllers/department.controller';
import { FacultyModule } from '../faculty/faculty.module';

@Module({
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([DepartmentPersistence]),
    FacultyModule,
  ],
  providers: [...DepartmentUseCases, DepartmentRepository],
  exports: [],
  controllers: [DepartmentController],
})
export class DepartmentModule {
}
