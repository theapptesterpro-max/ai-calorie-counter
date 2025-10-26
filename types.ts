
export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum UnitSystem {
  Metric = 'metric',
  Imperial = 'imperial',
}

export enum ActivityLevel {
  Sedentary = 'sedentary',
  LightlyActive = 'lightly',
  ModeratelyActive = 'moderately',
  VeryActive = 'very',
  ExtremelyActive = 'extremely',
}

export enum Goal {
  Lose = 'lose',
  Maintain = 'maintain',
  Gain = 'gain',
}

export enum WeightGoalRate {
  Slow = 'slow',
  Moderate = 'moderate',
  Aggressive = 'aggressive',
}

export interface MacroGoals {
  protein: number; // in grams
  carbs: number; // in grams
  fats: number; // in grams
}

export interface WeightLogEntry {
  date: string; // YYYY-MM-DD
  weight: number; // kg
}

export interface UserProfile {
  age: number;
  gender: Gender;
  height: number; // cm
  currentWeight: number; // kg
  targetWeight: number; // kg
  activityLevel: ActivityLevel;
  goal: Goal;
  rate: WeightGoalRate | null;
  calorieGoal: number;
  macroGoals: MacroGoals;
  weightLog: WeightLogEntry[];
}

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snacks = 'Snacks',
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number; // per 100g
  protein: number; // per 100g
  carbs: number; // per 100g
  fats: number; // per 100g
}

export interface FoodEntry {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: string; // e.g., "100g" or "1 cup"
  mealType: MealType;
  timestamp: string;
}

export interface DailyLog {
  entries: FoodEntry[];
}

export interface AIFoodItem {
  foodName: string;
  portionSize: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  confidence: 'high' | 'medium' | 'low';
}