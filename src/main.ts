// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { setupSwagger } from './configs/swgger.config';
// import { ResponseInterceptor } from './utils/interceptors/reponse.interceptor';
// import { AllExceptionsFilter } from './utils/filters/error.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());
//   setupSwagger(app)


//   app.useGlobalInterceptors(new ResponseInterceptor());
//   app.useGlobalFilters(new AllExceptionsFilter());
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from './utils/filters/error.filter';
import { setupSwagger } from './configs/swgger.config';
import { ResponseInterceptor } from './utils/interceptors/reponse.interceptor';
import * as morgan from 'morgan';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(morgan('dev'));
  // enable validation globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // setup Swagger docs
  setupSwagger(app);

  // enable CORS (optional, but usually needed)
  app.enableCors();

  // use global response & error handlers
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // set global prefix for APIs (optional)
  // app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
