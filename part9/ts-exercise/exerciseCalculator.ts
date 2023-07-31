interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (exerciseData: number[]): Result => {
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