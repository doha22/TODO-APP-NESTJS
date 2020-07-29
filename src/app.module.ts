import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { Configuration } from './shared/configuration/configuration/configuration.enum';
import { ConfigurationService } from './shared/configuration/configuration/configuration.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { ControllerService } from './controller/controller.service';

@Module({
  imports: [SharedModule
    , MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: async (_configService: ConfigurationService) => ({
          uri: 'mongodb://localhost:27017/ToDo',
          // retryDelay: 500,
          // retryAttempts: 3,
          useFindAndModify: false,
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
      }),
      inject: [ConfigurationService],
  }), UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, ControllerService],
})

// check for configuration
// in app.modules , the variables should be static to be accessed from main.ts
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly _configurationService: ConfigurationService) {
      AppModule.port = AppModule.normalizePort(_configurationService.get(Configuration.PORT));
      AppModule.host = _configurationService.get(Configuration.HOST);
      AppModule.isDev = _configurationService.isDevelopment;
  }

  // check for port num
  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
}

}
