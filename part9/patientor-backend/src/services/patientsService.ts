import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

const getAllPatients = (): Patient[] => {
  return patients;
};

const getAllNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient => {
  return patients.find(patient => patient.id === id) as Patient;
}

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  getPatientById,
  addPatient,
}