import React, { useEffect, useState } from "react";
import logo from "./package.png";
import "./App.css";
import {
  fetchAllDepartments,
  fetchAllParcels,
  fetchParcelsByDepartments,
} from "../../api/api";
import { Parcel } from "../../models/container.models";
import {
  ParcelsByDepartment,
  DepartmentType,
} from "../../models/department.models";
import { Parcels } from "../../components/Parcels";
import { DepartmentFilter } from "../../components/DepartmentFilter";

function App() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentType | null>(null);

  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [parcelsByDepartment, setParcelsByDepartment] =
    useState<ParcelsByDepartment>({} as ParcelsByDepartment);

  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  useEffect(() => {
    fetchAllParcels().then((result) => setParcels(result));
    fetchParcelsByDepartments().then((result) =>
      setParcelsByDepartment(result)
    );
    fetchAllDepartments().then((result) => setDepartments(result));
  }, []);

  const parcelsToRender =
    selectedDepartment === null
      ? parcels
      : parcelsByDepartment[selectedDepartment] || [];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Shipping Corp</p>
      </header>
      <main>
        <DepartmentFilter
          selectedDepartment={selectedDepartment}
          departments={departments}
          onSelectDepartment={setSelectedDepartment}
        />

        <Parcels parcels={parcelsToRender} />
      </main>
    </div>
  );
}

export default App;
