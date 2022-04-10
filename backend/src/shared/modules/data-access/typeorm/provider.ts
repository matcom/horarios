import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../config/app-config.module';
import { AppConfigService } from '../../config/service/app-config-service';
import { ConnectionOptions } from 'typeorm';

export const typeOrmProvider = TypeOrmModule.forRootAsync({
  imports: [AppConfigModule],
  inject: [AppConfigService],
  useFactory: (config: AppConfigService): ConnectionOptions => {
    return {
      entities: [
        __dirname + '/../../../../**/infrastructure/entities/*.entity{.ts,.js}',
        __dirname + '/../../../../**/infrastructure/entities/*.view{.ts,.js}',
      ],
      logging: config.app.nodeEnv !== 'production',
      ...config.database,
    } as ConnectionOptions;
  },
});
