// FIXME: this file should be generated from backend

import { Parcel } from "./container.models";

export enum DepartmentType {
  Mail = "Mail",
  Regular = "Regular",
  Heavy = "Heavy",
  Insurance = "Insurance",
}

export type ParcelsByDepartment = Record<DepartmentType, Parcel[]>;
