import { Controller, Get } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get('all')
  getDepartments(): string[] {
    return this.departmentService.getDepartmentNames();
  }
}
