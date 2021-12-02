import { Controller, Get, Param } from '@nestjs/common';
import { Container } from './container.models';
import { ContainerService } from './container.service';

@Controller('container')
export class ContainerController {
  constructor(private containerService: ContainerService) {}

  @Get(':id')
  getData(@Param('id') containerId: string): Promise<Container> {
    return this.containerService.getContainer(containerId);
  }
}
