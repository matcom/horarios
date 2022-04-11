import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from 'passport-local'
import { ValidateUserUseCase } from "../useCase/auth.validate.use-case";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly validateUserUseCase: ValidateUserUseCase) {
        super({ usernameField: "email" });
    }
    async validate(email: string, password: string): Promise<any> {
        const user = await this.validateUserUseCase.execute({ email: email, password: password })
        if (user.isLeft) {
            throw new UnauthorizedException('user not register');
        }

        return user.value;
    }
}