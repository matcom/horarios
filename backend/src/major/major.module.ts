import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorPersistence } from './infra/entities/major.persistence';
import { MajorRepository } from './infra/repositories/major.repository';
import { MajorController } from './presentation/controllers/major.controller';
import { FindByIdMajorUseCase, MajorUseCase } from './application/useCases';

@Module({
  imports: [DataAccessModule, TypeOrmModule.forFeature([MajorPersistence])],
  providers: [...MajorUseCase, MajorRepository],
  exports: [FindByIdMajorUseCase],
  controllers: [MajorController],
})
export class MajorModule {
}
