import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { ParsedQs } from 'qs';
import { isNotNumber } from './utils';

const app = express();

interface BmiRequestDataInput {
  height: number,
  weight: number
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const parseQuery = (query: ParsedQs): BmiRequestDataInput => {
    if(!isNotNumber(query.height) && !isNotNumber(query.weight)) {
      return {
        height: Number(query.height),
        weight: Number(query.weight)
      }
    } else {
      throw new Error('malformatted parameters');
    }
  }

  try {
    const { height, weight } = parseQuery(req.query);
    res.status(200).send({
      height: height,
      weight: weight,
      bmi: calculateBmi(height, weight)
    });
  } catch (error: unknown) {
    let errorMessage: string = 'Error: '
    if (error instanceof Error) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Unknown Error'
    }
    res.status(400).send({ error: errorMessage })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});