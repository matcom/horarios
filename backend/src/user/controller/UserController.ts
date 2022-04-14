import { Body, Controller, Post, Request, Response, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/application/Guards/JwtAuthGuard";
import { RolesGuard } from "src/auth/application/Guards/RoleGuard";
import { ProcesResponse } from "src/shared/core/utils/proces.response";
import { EnumPermits } from "src/shared/domain/enum.permits";
import { UserCreateDto } from "../application/dtos/user.create.dto";
import { UserUpdateDto } from "../application/dtos/user.update.dto";
import { CreateUserUseCase } from "../application/useCases/user.create.use-case";
import { UpdateUserUseCase } from "../application/useCases/user.update.use-case";
import { User } from "../domain/entities/user.entity";

//@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly createUser: CreateUserUseCase, private readonly updateUser: UpdateUserUseCase) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() userCreateDto: UserCreateDto, @Response() res) {
        console.log(userCreateDto)
        const user = await this.createUser.execute(userCreateDto)
        return ProcesResponse.setResponse(res, user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async update(@Body() updateUserDto: UserUpdateDto, @Response() res) {
        console.log(updateUserDto)
        const user = await this.updateUser.execute(updateUserDto)
        return ProcesResponse.setResponse(res, user)
    }




}