import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;


// to show UI of RESTFUL API
const swaggerOptions = new DocumentBuilder()
        .setTitle('ToDo App')
        .setDescription('API Documentation')
        //.setBasePath('/api')
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

    SwaggerModule.setup('/api/docs', app, swaggerDoc, {
        swaggerUrl: `${hostDomain}/api/docs-json`,
        explorer: true,
        swaggerOptions: {
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    });

  //  app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());



  await app.listen(AppModule.port);
}
bootstrap();
