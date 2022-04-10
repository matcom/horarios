import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { SendEmailUseCase } from './application/useCases/email.send.use-case';

//ponerle las variables de entorno para esto
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: "smtp.gmail.com",
                    secure: true,
                    auth: {
                        user: "username@gmail.com",
                        pass: "password"
                    }
                }, defaults: {
                    from: `"nest-modules" <${'username@gmail.com'}>`
                },
            })
        })
    ],
    providers: [SendEmailUseCase]
})
export class EmailModule { }
