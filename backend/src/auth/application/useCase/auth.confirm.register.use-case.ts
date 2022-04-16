import { Either, left, right } from 'src/shared/core/Either';
import { AppError } from '../../../shared/core/errors/AppError';
import { Result } from '../../../shared/core/Result';
import { IUseCase } from '../../../shared/core/interfaces/IUseCase';
import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import { EnumPermits } from 'src/shared/domain/enum.permits';
import { EnumStatus } from 'src/user/domain/enums/enum.status';
import { AppConfigService } from 'src/shared/modules/config/service/app-config-service';
import { UpdateUserUseCase } from 'src/user/application/useCases/user.update.use-case';
import { ConfirmRegisterDto } from '../dtos/confirm.register.dto';


export type ConfirmRegisterUseCaseResponse = Either<AppError.UnexpectedErrorResult<User>
    | AppError.ValidationErrorResult<User>,
    Result<User>>;

@Injectable()
export class RegisterUseCase implements IUseCase<ConfirmRegisterDto, Promise<ConfirmRegisterUseCaseResponse>> {

    private _logger: Logger;

    constructor(private readonly confifService: AppConfigService, private readonly updateUserUseCase: UpdateUserUseCase) {
        this._logger = new Logger('FindByIdUseCase');
    }

    async execute(request: ConfirmRegisterDto): Promise<ConfirmRegisterUseCaseResponse> {
        this._logger.log('Executing...');

        try {
            const id = await this.validateToken(request.token)

            const userConfirmRegister = await this.updateUserUseCase.execute({ id: id, data: { status: EnumStatus.Register } })

            
            
            
        } catch (error) {
            return left(Result.Fail(new AppError.UnexpectedError(error)));
        }
    }

    private async validateToken(token: string) {
        if (token) {
            //por ahora no hay validaciones , cuando se ponga el hash decodificar aqui y devolver el id
            return token
        }
    }
}