
const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (Math.pow(height/100, 2))
    let status = 'Normal'

    if(bmi < 18.5) status = 'Underweight'
    if(bmi > 24.9) status = 'Overweight'
    return `${status} (${height} ${weight})`
}

console.log(calculateBmi(180, 74))