// FIXME: this file should be generated from backend

export interface Container {
  Id: number;
  ShippingDate: Date;
  parcels: Parcel[];
}

export interface ContainerXml {
  Container: {
    Id: number;
    ShippingDate: string; // ISO Date
    parcels: {
      Parcel: Parcel[];
    };
  };
}

export interface Parcel {
  Receipient: Receipient;
  Weight: number;
  Value: number;
  SignedOff?: boolean;
}

export interface Receipient {
  Name: string;
  Address: Address;
}

export interface Address {
  Street: string;
  HouseNumber: number;
  PostalCode: string;
  City: string;
}
