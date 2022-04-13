import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { FindByEmailUserUseCase } from "src/user/application/useCases/user.findByEmail.use-case";
import { User } from "src/user/domain/entities/user.entity";
import { EnumStatus } from "src/user/domain/enums/enum.status";
import { UserRepository } from "src/user/infra/repositories/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly findByEmailUseCase: FindByEmailUserUseCase) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'poner el secret',
        });
    }
    async validate(payload: any): Promise<User> {

        try {
            const userDomainOrError = await this.findByEmailUseCase.execute(payload.email)
            if (userDomainOrError.isLeft) {
                throw new UnauthorizedException('error');
            }
            const userDomain = userDomainOrError.value.unwrap()
            if (!userDomain || userDomain.status == EnumStatus.Pending) {
                throw new UnauthorizedException('not permits');
            }
            return userDomain
        } catch (error) {
            throw new UnauthorizedException('not permits');
        }

    }
}