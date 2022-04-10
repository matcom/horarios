import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAccessModule } from 'src/shared/modules/data-access/data-access.module';
import { CreateUserUseCase } from './application/useCases/user.create.use-case';
import { UserPersistence } from './infra/entities/user.persistence';
import { UserRepository } from './infra/repositories/user.repository';

@Module({
    imports: [DataAccessModule, TypeOrmModule.forFeature([UserPersistence])],
    providers: [CreateUserUseCase, UserRepository],
})
export class UserModule { }
