import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './application/Strategies/localStrategy';
import { JwtStrategy } from './application/Strategies/jwtStrategy';
import { ValidateUserUseCase } from './application/useCase/auth.validate.use-case';

@Module({
    imports: [EmailModule, UserModule, PassportModule, JwtModule.register({
        secret: 'poner el secret',
        signOptions: { expiresIn: 10000 },
    })],
    controllers: [],
    providers: [ValidateUserUseCase, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
