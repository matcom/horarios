import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './application/Strategies/localStrategy';
import { JwtStrategy } from './application/Strategies/jwtStrategy';
import { ValidateUserUseCase } from './application/useCase/auth.validate.use-case';
import { AuthController } from './controller/AuthController';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), EmailModule, UserModule, PassportModule, JwtModule.register({
        secret: new ConfigService().get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
    })],
    controllers: [AuthController],
    providers: [ValidateUserUseCase, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
