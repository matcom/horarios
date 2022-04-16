import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/application/Guards/JwtAuthGuard';
import { ProcessResponse } from 'src/shared/core/utils/processResponse';
import { UserCreateDto } from '../application/dtos/user.create.dto';
import { UserUpdateDto } from '../application/dtos/user.update.dto';
import { CreateUserUseCase } from '../application/useCases/user.create.use-case';
import { UpdateUserUseCase } from '../application/useCases/user.update.use-case';
import { UserMapper } from '../infra/mappers/user.mappers';

//@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase, private readonly updateUser: UpdateUserUseCase) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() userCreateDto: UserCreateDto, @Response() res) {
    console.log(userCreateDto);
    const user = await this.createUser.execute(userCreateDto);
    return ProcessResponse.setResponse(res, user, UserMapper.DomainToDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Body() updateUserDto: UserUpdateDto, @Response() res) {
    console.log(updateUserDto);
    const user = await this.updateUser.execute(updateUserDto);
    return ProcessResponse.setResponse(res, user, UserMapper.DomainToDto);
  }


}