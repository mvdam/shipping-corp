import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';
import { Container, ContainerXml } from './app.models';

const DATA_FILE_PATH = join(__dirname, '../data/Container_68465468.xml');

@Injectable()
export class AppService {
  async getContainerData(): Promise<Container> {
    const fileBuffer = await fs.readFile(DATA_FILE_PATH);
    const xmlString = fileBuffer.toString();

    const parser = new XMLParser();
    const containerXml: ContainerXml = parser.parse(xmlString);

    return this.containerXmlToContainer(containerXml);
  }

  private containerXmlToContainer(xml: ContainerXml): Container {
    return {
      ...xml.Container,
      parcels: xml.Container.parcels.Parcel,
      ShippingDate: new Date(xml.Container.ShippingDate),
    };
  }
}
