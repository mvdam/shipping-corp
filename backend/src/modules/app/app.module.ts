import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from '../container/container.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [ContainerModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
