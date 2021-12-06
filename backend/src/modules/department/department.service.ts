import { Injectable } from '@nestjs/common';
import { Parcel } from '../container/container.models';
import { ParcelsByDepartment, DepartmentType } from './department.models';

interface DepartmentConfig {
  matchesParcel: (parcel: Parcel) => boolean;
}

type Tuple<A, B> = [A, B];

// FIXME: this should normally be in a db
const DEPARTMENTS_CONFIG = {
  [DepartmentType.Mail]: {
    matchesParcel: (parcel: Parcel): boolean => {
      return (
        parcel.Weight <= 1 && !DepartmentService.parcelRequiresSignOff(parcel)
      );
    },
  },
  [DepartmentType.Regular]: {
    matchesParcel: (parcel: Parcel): boolean => {
      return (
        parcel.Weight > 1 &&
        parcel.Weight <= 10 &&
        !DepartmentService.parcelRequiresSignOff(parcel)
      );
    },
  },
  [DepartmentType.Heavy]: {
    matchesParcel: (parcel: Parcel): boolean => {
      return (
        parcel.Weight > 10 && !DepartmentService.parcelRequiresSignOff(parcel)
      );
    },
  },
  [DepartmentType.Insurance]: {
    matchesParcel: (parcel: Parcel): boolean => {
      return DepartmentService.parcelRequiresSignOff(parcel);
    },
  },
};

@Injectable()
export class DepartmentService {
  static parcelRequiresSignOff(parcel: Parcel): boolean {
    if (!!parcel.SignedOff) {
      return false;
    }

    return parcel.Value > 1000;
  }

  getDepartmentNames() {
    return Object.keys(DEPARTMENTS_CONFIG);
  }

  groupParcelsByDepartment(parcels: Parcel[]): ParcelsByDepartment {
    return Object.entries(DEPARTMENTS_CONFIG).reduce(
      (
        groupedParcels: ParcelsByDepartment,
        department: Tuple<DepartmentType, DepartmentConfig>,
      ): ParcelsByDepartment => {
        const [departmentType, config] = department;
        const updated: ParcelsByDepartment = {
          ...groupedParcels,
          [departmentType]: parcels.filter(config.matchesParcel),
        };
        return updated;
      },
      {} as ParcelsByDepartment,
    );
  }
}
