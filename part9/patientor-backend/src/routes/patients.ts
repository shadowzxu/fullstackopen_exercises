import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAllNonSensitivePatients());
});

router.get(`/:id`, (req, res) => {
    const patient: Patient = patientsService.getPatientById(req.params.id);
    if(!patient) {
      res.status(404).send('Patient not found');
    }
    res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage: string = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;