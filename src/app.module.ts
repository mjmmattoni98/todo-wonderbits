import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from 'libs/DatabaseModule';
import { RequestStorageMiddleware } from 'libs/RequestStorageMiddleware';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    DatabaseModule,
    CacheModule.register({ isGlobal: true }),
    ThrottlerModule.forRoot(),
    TodoModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('*');
  }
}
