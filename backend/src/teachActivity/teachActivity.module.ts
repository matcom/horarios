import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachActivityPersistence } from '../teachActivity/infra/entities/teachActivity.persistence';
import { FacultyModule } from '../faculty/faculty.module';
import { TeachActivityRepository } from '../teachActivity/infra/repositories/teachActivity.repository';
import { TeachActivityController } from '../teachActivity/presentation/controllers/teachActivity.controller';
import { TeachActivityUseCases } from './application/useCases';

@Module({
  imports: [
    DataAccessModule,
    TypeOrmModule.forFeature([TeachActivityPersistence]),
    FacultyModule,
  ],
  providers: [...TeachActivityUseCases, TeachActivityRepository],
  exports: [],
  controllers: [TeachActivityController],
})
export class TeachActivityModule {
}
