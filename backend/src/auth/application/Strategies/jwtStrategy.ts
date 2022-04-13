import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from "src/user/domain/entities/user.entity";
import { EnumStatus } from "src/user/domain/enums/enum.status";
import { UserRepository } from "src/user/infra/repositories/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'poner el secret',
        });
    }
    async validate(payload: any): Promise<User> {

        try {
            const userDomain = await this.userRepository.findOne({ email: payload.email })
            if (!userDomain || userDomain.status == EnumStatus.pendin) {
                throw new UnauthorizedException('not permits');
            }
            return userDomain
        } catch (error) {
            throw new UnauthorizedException('not permits');
        }

    }
}