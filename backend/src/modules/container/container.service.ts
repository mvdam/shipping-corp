import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';
import { Container, ContainerXml, Parcel } from './container.models';
import { ParcelsByDepartment } from '../department/department.models';
import { DepartmentService } from '../department/department.service';

// FIXME: this should normally be in a db / external service
const DATA_FILE_PATH = join(__dirname, '../../../data/Container_68465468.xml');

@Injectable()
export class ContainerService {
  constructor(private departmentService: DepartmentService) {}

  async getContainer(_containerId: string): Promise<Container> {
    const fileBuffer = await fs.readFile(DATA_FILE_PATH);
    const xmlString = fileBuffer.toString();

    const parser = new XMLParser();
    const containerXml: ContainerXml = parser.parse(xmlString);

    return this.containerXmlToContainer(containerXml);
  }

  async getContainerParcels(containerId: string): Promise<Parcel[]> {
    const containerData = await this.getContainer(containerId);
    return containerData.parcels;
  }

  async getContainerParcelsByDepartment(
    containerId: string,
  ): Promise<ParcelsByDepartment> {
    const parcels = await this.getContainerParcels(containerId);
    return this.departmentService.groupParcelsByDepartment(parcels);
  }

  private containerXmlToContainer(xml: ContainerXml): Container {
    return {
      ...xml.Container,
      parcels: xml.Container.parcels.Parcel,
      ShippingDate: new Date(xml.Container.ShippingDate),
    };
  }
}
