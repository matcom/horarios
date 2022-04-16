import { Body, Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ProcessResponse } from 'src/shared/core/utils/processResponse';
import { RegisterDto } from '../application/dtos/register.dto';
import { LocalAuthGuard } from '../application/Guards/LocalAythGuard';
import { LoginUseCase } from '../application/useCase/auth.login.use-case';
import { RegisterUseCase } from '../application/useCase/auth.register.use-case';

@Controller('Auth')
export class AuthController {
  constructor(private readonly authRegister: RegisterUseCase, private readonly authLogin: LoginUseCase) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async Login(@Request() req, @Response() res) {
    const login = await this.authLogin.execute(req.user);
    return ProcessResponse.setResponse(res, login, (a) => a);
  }

  @Post('register')
  async Register(@Body() userDto: RegisterDto, @Response() res) {
    const user = await this.authRegister.execute(userDto);
    return ProcessResponse.setResponse(res, user, (a) => a);
  }

}