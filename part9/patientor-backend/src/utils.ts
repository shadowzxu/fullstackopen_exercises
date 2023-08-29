import { Entry, Gender, NewPatient } from "./types";

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
  return Object.values(Gender).map(val => val.toString()).includes(str);
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

const parseEntries = (): Entry[] => {
  return [];
}

/**
 * Parse object to patient utility type: NewPatientEntry
 * @param object 
 * @returns 
 */
export const toNewPatientEntry = (object: unknown): NewPatient => {
  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'dateOfBirth' in object && 'ssn' in object &&
      'occupation' in object && 'gender' in object && 'entries' in object){
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: parseEntries()
    };
  
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};