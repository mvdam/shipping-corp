import React from "react";
import { DepartmentType } from "../models/department.models";

interface DepartmentFilterProps {
  selectedDepartment: DepartmentType | null;
  departments: DepartmentType[];
  onSelectDepartment: (department: DepartmentType | null) => void;
}

export const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  selectedDepartment,
  departments,
  onSelectDepartment,
}) => (
  <select
    defaultValue={selectedDepartment || ""}
    onChange={(event) =>
      onSelectDepartment(
        event.target.value ? (event.target.value as DepartmentType) : null
      )
    }
  >
    <option value="">- All -</option>
    {departments.map((department) => (
      <option key={department} value={department}>
        {department}
      </option>
    ))}
  </select>
);
