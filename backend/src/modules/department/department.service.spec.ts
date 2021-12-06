import { Test, TestingModule } from '@nestjs/testing';
import { Parcel } from '../container/container.models';
import { DepartmentType } from './department.models';
import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
  let service: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentService],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
  });

  describe('parcelRequiresSignOff', () => {
    it('returns false for a parcel value below 1000', () => {
      expect(
        DepartmentService.parcelRequiresSignOff({
          Value: 999,
        } as Parcel),
      ).toEqual(false);
    });

    it('returns false for a parcel that is already signed off', () => {
      expect(
        DepartmentService.parcelRequiresSignOff({
          SignedOff: true,
        } as Parcel),
      ).toEqual(false);
    });

    it('returns true for a parcel that with a value higher than 1000', () => {
      expect(
        DepartmentService.parcelRequiresSignOff({
          Value: 1001,
          SignedOff: false,
        } as Parcel),
      ).toEqual(true);
    });
  });

  describe('getDepartmentNames', () => {
    it('returns an array of all the department names', () => {
      expect(service.getDepartmentNames()).toEqual(Object.keys(DepartmentType));
    });
  });

  describe('groupParcelsByDepartment', () => {
    it('groups parcels of low weight to the Mail department', () => {
      expect(
        service.groupParcelsByDepartment([
          {
            Weight: 0.99,
          },
          {
            Weight: 0,
          },
          {
            Weight: 1.1,
          },
        ] as Parcel[]),
      ).toEqual({
        Mail: [
          {
            Weight: 0.99,
          },
          {
            Weight: 0,
          },
        ],
        Regular: [
          {
            Weight: 1.1,
          },
        ],
        Heavy: [],
        Insurance: [],
      });
    });

    it('groups parcels of high value to the  weight to the Insurance department', () => {
      expect(
        service.groupParcelsByDepartment([
          {
            Weight: 9,
            Value: 0,
          },
          {
            Weight: 0,
            Value: 10000,
          },
          {
            Weight: 1.1,
            Value: 1001,
          },
        ] as Parcel[]),
      ).toEqual({
        Mail: [],
        Regular: [
          {
            Weight: 9,
            Value: 0,
          },
        ],
        Heavy: [],
        Insurance: [
          {
            Weight: 0,
            Value: 10000,
          },
          {
            Weight: 1.1,
            Value: 1001,
          },
        ],
      });
    });

    it('groups signed off parels of high value at the weight-based department', () => {
      expect(
        service.groupParcelsByDepartment([
          {
            Weight: 12,
            Value: 10000,
            SignedOff: true,
          },
          {
            Weight: 0,
            Value: 1,
          },
          {
            Weight: 3,
            Value: 22,
          },
          {
            Weight: 3000,
            Value: 1001,
            SignedOff: true,
          },
        ] as Parcel[]),
      ).toEqual({
        Mail: [
          {
            Weight: 0,
            Value: 1,
          },
        ],
        Regular: [
          {
            Weight: 3,
            Value: 22,
          },
        ],
        Heavy: [
          {
            Weight: 12,
            Value: 10000,
            SignedOff: true,
          },
          {
            Weight: 3000,
            Value: 1001,
            SignedOff: true,
          },
        ],
        Insurance: [],
      });
    });
  });
});
