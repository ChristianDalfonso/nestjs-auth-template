import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl:
          configService.get('MONGO_DB') ||
          'mongodb://localhost:27017/exampleApp',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
