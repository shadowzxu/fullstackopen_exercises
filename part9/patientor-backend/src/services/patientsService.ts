import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";

const getEntry = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntry,
  getNonSensitiveEntries,
  addPatient,
}