import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachYearPersistence } from '../teachYear/infra/entities/teachYear.persistence';
import { FacultyModule } from '../faculty/faculty.module';
import { TeachYearRepository } from '../teachYear/infra/repositories/teachYear.repository';
import { TeachYearController } from '../teachYear/presentation/controllers/teachYear.controller';
import { TeachYearUseCases } from './application/useCases';

@Module({
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([TeachYearPersistence]),
    FacultyModule,
  ],
  providers: [...TeachYearUseCases, TeachYearRepository],
  exports: [],
  controllers: [TeachYearController],
})
export class TeachYearModule {
}
