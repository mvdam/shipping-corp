import { Module } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerController } from './container.controller';
import { DepartmentService } from '../department/department.service';

@Module({
  providers: [ContainerService, DepartmentService],
  controllers: [ContainerController],
})
export class ContainerModule {}
