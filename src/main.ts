import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

// const httpsOptions = {
//   key: fs.readFileSync('./public/ssl/localhost.pem'),
//   cert: fs.readFileSync('./public/ssl/cert.pem'),
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);//, {httpsOptions,}
  app.enableCors();
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();

