export type AdultBmiCategory = "Underweight" | "Normal weight range" | "Overweight" | "Obesity class I" | "Obesity class II" | "Obesity class III";

export type BmiResult = { bmi: number; category: AdultBmiCategory; note: string };

/** Adult BMI only. Do not use these cutoffs for children or adolescents. */
export function calculateAdultBmi(weightKg: number, heightM: number): BmiResult {
  if (!Number.isFinite(weightKg) || !Number.isFinite(heightM)) throw new Error("Enter valid numeric measurements.");
  if (weightKg <= 0 || heightM <= 0) throw new Error("Height and weight must be greater than zero.");
  if (weightKg > 500 || heightM > 2.8 || heightM < 0.5) throw new Error("These measurements look unusual. Check the values and units.");
  const bmi = weightKg / (heightM * heightM);
  let category: AdultBmiCategory;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight range";
  else if (bmi < 30) category = "Overweight";
  else if (bmi < 35) category = "Obesity class I";
  else if (bmi < 40) category = "Obesity class II";
  else category = "Obesity class III";
  return { bmi: Number(bmi.toFixed(1)), category, note: "BMI is a screening measure, not a diagnosis. It does not directly measure body fat or overall health." };
}
