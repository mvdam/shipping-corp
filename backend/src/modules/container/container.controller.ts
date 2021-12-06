import { Controller, Get, Param } from '@nestjs/common';
import { Container, Parcel } from './container.models';
import { ContainerService } from './container.service';
import { ParcelsByDepartment } from '../department/department.models';

@Controller('container')
export class ContainerController {
  constructor(private containerService: ContainerService) {}

  @Get(':id')
  getContainerData(@Param('id') containerId: string): Promise<Container> {
    return this.containerService.getContainer(containerId);
  }

  @Get(':id/parcels')
  getParcels(@Param('id') containerId: string): Promise<Parcel[]> {
    return this.containerService.getContainerParcels(containerId);
  }

  @Get(':id/parcelsByDepartment')
  getParcelsByDepartment(
    @Param('id') containerId: string,
  ): Promise<ParcelsByDepartment> {
    return this.containerService.getContainerParcelsByDepartment(containerId);
  }
}
