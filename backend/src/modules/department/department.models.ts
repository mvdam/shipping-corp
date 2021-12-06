import { Parcel } from '../container/container.models';

export enum DepartmentType {
  Mail = 'Mail',
  Regular = 'Regular',
  Heavy = 'Heavy',
  Insurance = 'Insurance',
}

export type ParcelsByDepartment = Record<DepartmentType, Parcel[]>;
