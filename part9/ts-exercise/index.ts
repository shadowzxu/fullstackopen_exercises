import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { ParsedQs } from 'qs';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json())

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

app.get('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  const isArrayOfNumbers = (arr: any): boolean => {
    return Array.isArray(arr) && arr.every((val) => typeof val === 'number');
  };

  const parseReqBody = (daily_exercises: any, target: any): number[] => {
    if(!daily_exercises || !target) {
      throw new Error('parameters missing')
    }

    if(isArrayOfNumbers(daily_exercises) && !isNotNumber(target)) {
      daily_exercises.unshift(target);
    } else {
      throw new Error('malformatted parameters')
    };

    return daily_exercises;
  }

  try {
    const exerciseData: number[] = parseReqBody(daily_exercises, target);
    const result = calculateExercises(exerciseData);
    res.status(200).send(result);
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

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});