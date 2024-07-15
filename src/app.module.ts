import { Module } from '@nestjs/common';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [InfraestructureModule, TodoModule],
})
export class AppModule {}
