import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { VerifyExceptionFilter } from './verify-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger 文档
  const config = new DocumentBuilder()
    .setTitle('WePo')
    .setDescription('The WePo API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 开启全局验证管道
  app.useGlobalPipes(new ValidationPipe())

  // 验证返回格式过滤 从 { statusCode, message ... } 变为 { code,  msg}
  app.useGlobalFilters(new VerifyExceptionFilter())

  await app.listen(3000);
}
bootstrap();
