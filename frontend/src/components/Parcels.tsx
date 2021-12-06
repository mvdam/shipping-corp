import React from "react";
import { Parcel } from "../models/container.models";

interface ParcelsProps {
  parcels: Parcel[];
}

export const Parcels: React.FC<ParcelsProps> = ({ parcels }) => (
  <table>
    <thead>
      <tr>
        <th>Receipient</th>
        <th>Weight</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {parcels.map((parcel, index) => (
        <tr key={index}>
          <td>{parcel.Receipient.Name}</td>
          <td>{parcel.Weight}</td>
          <td>{parcel.Value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
