import { Test, TestingModule } from '@nestjs/testing';
import { ContainerService } from './container.service';
import { DepartmentService } from '../department/department.service';

describe('ContainerService', () => {
  let service: ContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContainerService, DepartmentService],
    }).compile();

    service = module.get<ContainerService>(ContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
