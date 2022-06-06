import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //class-validation 연동
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  //swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();
  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('docs', app, swaggerDocument);

  //cors
  app.enableCors({
    //모든 사이트 허용 특정 url으로 변경해준다.
    origin: true,
    credentials: true,
  });
  //port
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
