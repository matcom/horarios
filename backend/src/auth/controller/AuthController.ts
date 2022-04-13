import { Body, Controller, Post, Request, Response, UseGuards } from "@nestjs/common";
import { ProcesResponse } from "src/shared/core/utils/proces.response";
import { User } from "src/user/domain/entities/user.entity";
import { RegisterDto } from "../application/dtos/register.dto";
import { ReturnLoginDto } from "../application/dtos/returnLoginDto";
import { LocalAuthGuard } from "../application/Guards/LocalAythGuard";
import { LoginUseCase } from "../application/useCase/auth.login.use-case";
import { RegisterUseCase } from "../application/useCase/auth.register.use-case";

@Controller('Auth')
export class AuthController {
    constructor(private readonly authRegister: RegisterUseCase, private readonly authLogin: LoginUseCase) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async Login(@Request() req, @Response() res): Promise<ReturnLoginDto> {
        const login = await this.authLogin.execute(req.user)
        return ProcesResponse.setResponse(res, login)
    }

    @Post('register')
    async Register(@Body() userDto: RegisterDto, @Response() res): Promise<User> {
        const user = await this.authRegister.execute(userDto)
        return ProcesResponse.setResponse(res, user)
    }

}