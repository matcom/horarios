import { Module } from '@nestjs/common';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatTeacherPersistence } from './infra/entities/catTeacher.persistence';
import { CatTeacherRepository } from './infra/repositories/catTeacher.repository';
import { CatTeacherUseCases } from './application/useCases';
import { CatTeacherController } from './presentation/controllers/catTeacher.controller';


@Module({
  imports: [DataAccessModule, TypeOrmModule.forFeature([CatTeacherPersistence])],
  providers: [...CatTeacherUseCases, CatTeacherRepository],
  exports: [],
  controllers: [CatTeacherController],
})
export class CatTeacherModule {
}
