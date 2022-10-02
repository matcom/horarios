import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherPersistence } from './infra/entities/teacher.persistence';
import { TeacherUseCases } from './application/useCases';
import { TeacherRepository } from './infra/repositories/teacher.repository';
import { TeacherController } from './presentation/controllers/teacher.controller';
import { FacultyModule } from '../faculty/faculty.module';

@Module({
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([TeacherPersistence]),
    FacultyModule,
  ],
  providers: [...TeacherUseCases, TeacherRepository],
  exports: [TeacherRepository],
  controllers: [TeacherController],
})
export class TeacherModule {
}

