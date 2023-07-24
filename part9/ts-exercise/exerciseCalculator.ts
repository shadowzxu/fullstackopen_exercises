import { isNotNumber } from "./utils";

type ExerciseData = number[];

interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgument = (args: string[]): ExerciseData => {
  let index: number = 2, exerciseData: ExerciseData = [];
  while(args[index]){
    if(isNotNumber(args[index])) {
      throw new Error('Provided values were not numbers!');
    }
    exerciseData.push(Number(args[index]));
    index++;
  }

  return exerciseData;
}

const calculateExercises = (exerciseData: number[]): Result => {
  const target = exerciseData[0];
  const hours = exerciseData.slice(1);
  const periodLength = hours.length;
  const trainingDays = hours.filter(day => day > 0).length;
  const averageHours = hours.reduce((total, day) => total + day, 0) / hours.length;

  let rating, ratingDescription;
  
  if(trainingDays <= 2){
    rating = 1;
    ratingDescription = 'could be better';
  }
  else if(trainingDays <= 5){
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  else {
    rating = 3;
    ratingDescription = 'excellent';
  }

  return { 
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: trainingDays >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageHours
  }
}

try {
  const exerciseData = parseArgument(process.argv);
  console.log(calculateExercises(exerciseData));
} catch(error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}