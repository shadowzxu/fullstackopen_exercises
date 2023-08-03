import express from 'express';
import diagonosesService from '../services/diagonosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagonosesService.getEntries());
})

export default router;