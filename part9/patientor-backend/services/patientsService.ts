import patients from "../data/patients"
import { Patient, NonSensitivePatientEntry } from "../types";

const getEntry = (): Patient[] => {
  return patients;
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

export default {
  getEntry,
  getNonSensitiveEntries
}