import { Parcel } from "../models/container.models";
import {
  DepartmentType,
  ParcelsByDepartment,
} from "../models/department.models";

const API_URL = "http://localhost:9000";

export const fetchAllParcels = (): Promise<Parcel[]> => {
  return fetch(`${API_URL}/container/123/parcels`, {
    method: "GET",
  }).then((response) => response.json());
};

export const fetchAllDepartments = (): Promise<DepartmentType[]> => {
  return fetch(`${API_URL}/department/all`, {
    method: "GET",
  }).then((response) => response.json());
};

export const fetchParcelsByDepartments = (): Promise<ParcelsByDepartment> => {
  return fetch(`${API_URL}/container/123/parcelsByDepartment`, {
    method: "GET",
  }).then((response) => response.json());
};
