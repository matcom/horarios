import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppConfigService } from './service/app-config-service';
import { appConfig, appSchema } from './namespaces/app.config';
import { databaseSchema, databaseConfig } from './namespaces/database.config';
import { emailSchema, emailConfig } from './namespaces/email.config';
import { graphqlConfig, graphqlSchema } from './namespaces/graphql.config';
import { erpSchema, erpConfig } from './namespaces/erp.config';
import { syncSchema, syncConfig } from './namespaces/sync.config';
import {
  inventoryClientConfig,
  inventoryClientSchema,
} from './namespaces/inventoryClient.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        syncConfig,
        appConfig,
        erpConfig,
        databaseConfig,
        emailConfig,
        graphqlConfig,
        inventoryClientConfig,
      ],
      validationSchema: Joi.object({
        ...appSchema,
        ...databaseSchema,
        ...emailSchema,
        ...graphqlSchema,
        ...erpSchema,
        ...syncSchema,
        ...inventoryClientSchema,
      }),
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {
}
