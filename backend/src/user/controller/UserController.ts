import { Controller, Post, Request, Response, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "src/auth/application/Guards/LocalAythGuard";
import { ProcesResponse } from "src/shared/core/utils/proces.response";
import { UserCreateDto } from "../application/dtos/user.create.dto";
import { CreateUserUseCase } from "../application/useCases/user.create.use-case";
import { User } from "../domain/entities/user.entity";


@Controller('user')
export class UserController {
    constructor(private readonly createUser: CreateUserUseCase) { }

    @UseGuards(LocalAuthGuard)
    @Post('create')
    async create(userCreateDto: UserCreateDto, @Response() res): Promise<User> {
        const user = await this.createUser.execute(userCreateDto)
        return ProcesResponse.setResponse(res, user)
    }

}