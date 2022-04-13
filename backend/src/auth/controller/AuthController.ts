import { Controller, Post, Request, Response, UseGuards } from "@nestjs/common";
import { ProcesResponse } from "src/shared/core/utils/proces.response";
import { ReturnLoginDto } from "../application/dtos/returnLoginDto";
import { LocalAuthGuard } from "../application/Guards/LocalAythGuard";
import { LoginUseCase } from "../application/useCase/auth.login.use-case";

@Controller('Auth')
export class AuthController {
    constructor(private readonly authLogin: LoginUseCase) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async Login(@Request() req, @Response() res): Promise<ReturnLoginDto> {
        const login = await this.authLogin.execute(req.user)
        return ProcesResponse.setResponse(res, login)
    }

}