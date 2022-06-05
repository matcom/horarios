import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentPersistence } from '../student/infra/entities/student.persistence';
import { FacultyModule } from '../faculty/faculty.module';
import { StudentUseCases } from '../student/application/useCases';
import { StudentRepository } from '../student/infra/repositories/student.repository';
import { StudentController } from '../student/presentation/controllers/student.controller';
import { MajorModule } from '../major/major.module';

@Module({
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([StudentPersistence]),
    FacultyModule,
    MajorModule,
  ],
  providers: [...StudentUseCases, StudentRepository],
  exports: [],
  controllers: [StudentController],
})
export class StudentModule {
}
