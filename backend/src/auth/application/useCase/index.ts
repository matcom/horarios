import { ValidateUserUseCase } from './auth.validate.use-case';
import { LoginUseCase } from './auth.login.use-case';

export * from './auth.validate.use-case';
export * from './auth.login.use-case';

export const AuthUseCases = [
  ValidateUserUseCase,
  LoginUseCase,
];