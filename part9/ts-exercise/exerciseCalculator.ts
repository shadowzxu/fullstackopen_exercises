interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[]): Result => {
  const TARGET = 5;
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
    success: trainingDays >= TARGET,
    rating: rating,
    ratingDescription: ratingDescription,
    target: TARGET,
    average: averageHours
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))