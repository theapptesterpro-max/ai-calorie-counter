
import { Gender, ActivityLevel, Goal, WeightGoalRate, MacroGoals, MealType } from '../types';

export const calculateBMR = (gender: Gender, weightKg: number, heightCm: number, age: number): number => {
  if (gender === Gender.Male) {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
};

const activityMultipliers: Record<ActivityLevel, number> = {
  [ActivityLevel.Sedentary]: 1.2,
  [ActivityLevel.LightlyActive]: 1.375,
  [ActivityLevel.ModeratelyActive]: 1.55,
  [ActivityLevel.VeryActive]: 1.725,
  [ActivityLevel.ExtremelyActive]: 1.9,
};

export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  return bmr * activityMultipliers[activityLevel];
};

const calorieAdjustments = {
  [Goal.Lose]: {
    [WeightGoalRate.Slow]: -250,
    [WeightGoalRate.Moderate]: -500,
    [WeightGoalRate.Aggressive]: -750,
  },
  [Goal.Gain]: {
    [WeightGoalRate.Slow]: 250,
    [WeightGoalRate.Moderate]: 350,
    [WeightGoalRate.Aggressive]: 500,
  },
  [Goal.Maintain]: {},
};

export const calculateCalorieGoal = (tdee: number, goal: Goal, rate: WeightGoalRate | null): number => {
  if (goal === Goal.Maintain || !rate) {
    return tdee;
  }
  const adjustment = (calorieAdjustments[goal] as Record<WeightGoalRate, number>)[rate] || 0;
  const goalCals = tdee + adjustment;
  return Math.max(1200, Math.min(4000, goalCals)); // Clamp between 1200 and 4000
};

export const calculateMacroGrams = (percentages: { protein: number; carbs: number; fats: number }, totalCalories: number): MacroGoals => {
  const proteinGrams = (percentages.protein / 100 * totalCalories) / 4;
  const carbsGrams = (percentages.carbs / 100 * totalCalories) / 4;
  const fatsGrams = (percentages.fats / 100 * totalCalories) / 9;
  return { protein: proteinGrams, carbs: carbsGrams, fats: fatsGrams };
};

export const getMealTypeForCurrentTime = (): MealType => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return MealType.Breakfast;
  if (hour >= 11 && hour < 16) return MealType.Lunch;
  if (hour >= 16 && hour < 21) return MealType.Dinner;
  return MealType.Snacks;
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const compressImage = async (file: File, maxSize: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error('Could not get canvas context'));
                }
                ctx.drawImage(img, 0, 0, width, height);
                // Returns base64 string without the 'data:image/jpeg;base64,' prefix
                resolve(canvas.toDataURL('image/jpeg', 0.8).split(',')[1]);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};
