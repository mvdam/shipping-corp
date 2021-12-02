import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('container-data')
  getData(): Promise<any> {
    return this.appService.getContainerData();
  }
}
