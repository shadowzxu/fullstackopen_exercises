import { isNotNumber } from "./utils";

interface Input {
  height: number;
  weight: number;
}

const parseArgument = (args: string[]): Input => {
  if(!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (Math.pow(height/100, 2));
  let status = 'Normal';

  if(bmi < 18.5) status = 'Underweight';
  if(bmi > 24.9) status = 'Overweight';
  return `${status} (${height} ${weight})`;
};

try {
  const {height, weight} = parseArgument(process.argv)
  console.log(calculateBmi(height, weight));
} catch(error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}