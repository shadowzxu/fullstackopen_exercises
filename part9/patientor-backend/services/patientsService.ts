import { v1 as uuid } from 'uuid';
import patients from "../data/patients";
import { Patient, NonSensitivePatientEntry, NewPatientEntry, Gender } from "../types";

/**
 * type guards
 */
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (str: string): str is Gender => {
  return ['male', 'female', 'other'].includes(str);
};

/**
 * type parsers
 */
const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name');

  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

/**
 * Patient Services
 */
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

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log(object);
  const newEntry: NewPatientEntry = {
    name: parseName('Jason Xu'),
    dateOfBirth: parseDateOfBirth('1996-11-10'),
    ssn: parseSsn('333-666-999'),
    occupation: parseOccupation('Developer'),
    gender: parseGender('male')
  };

  return newEntry;
};

export default {
  getEntry,
  getNonSensitiveEntries,
  addPatient,
  toNewPatientEntry
}