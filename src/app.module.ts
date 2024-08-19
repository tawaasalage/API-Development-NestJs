import {  MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    UsersModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes('users'); // Apply logger middleware for all routes in the 'users' module
  }
}
