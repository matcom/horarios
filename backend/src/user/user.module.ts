import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateUserUseCase } from 'src/auth/application/useCase';
import { DataAccessModule } from 'src/shared/modules/data-access/data-access.module';
import { CreateUserUseCase } from './application/useCases/user.create.use-case';
import { FindByEmailUserUseCase } from './application/useCases/user.findByEmail.use-case';
import { FindByIdUserUseCase } from './application/useCases/user.findById.use-case';
import { UserController } from './controller/UserController';
import { UserPersistence } from './infra/entities/user.persistence';
import { UserRepository } from './infra/repositories/user.repository';

@Module({
    imports: [DataAccessModule, TypeOrmModule.forFeature([UserPersistence])],
    providers: [ValidateUserUseCase, CreateUserUseCase, FindByEmailUserUseCase, FindByIdUserUseCase, UserRepository],
    controllers: [UserController],
    exports:[UserRepository,ValidateUserUseCase,FindByEmailUserUseCase]
})
export class UserModule { }
