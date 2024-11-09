import { PatientsType } from "@/components/Table";
import React from "react";
import PatientTable from "@/components/Table";
import Link from "next/link";
import { Button } from "@mantine/core";

export const getPatients = (): PatientsType[] => {
  if (typeof window !== "undefined") {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    return patients;
  }

  return [];
};

export default function Table() {
  const patients = getPatients();

  return (
    <div className="">
      <div className="h-[60px] px-12 flex items-center justify-between bg-gray-50 border-b border-gray-200 border-solid">
        <h1 className="font-bold text-xl font-mono">Breast cancer detection</h1>
        <Link href="/">
          <Button>Make a prediction</Button>
        </Link>
      </div>
      <div className="px-8">
        {patients.length > 0 ? (
          <PatientTable data={patients}></PatientTable>
        ) : (
          <h1 className="text-2xl text-center font-bold mt-4">
            No data made yet
          </h1>
        )}
      </div>
    </div>
  );
}
