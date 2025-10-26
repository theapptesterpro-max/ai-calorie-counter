
import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel, Goal, WeightGoalRate, MacroGoals } from '../../types';
import { calculateBMR, calculateTDEE, calculateCalorieGoal, calculateMacroGrams } from '../../utils/helpers';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: 25,
    gender: Gender.Male,
    height_cm: 180,
    current_kg: 80,
    target_kg: 75,
    activityLevel: ActivityLevel.ModeratelyActive,
    goal: Goal.Lose,
    rate: WeightGoalRate.Moderate,
  });

  const [finalGoals, setFinalGoals] = useState<{ calorieGoal: number; macroGoals: MacroGoals } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' || name.includes('kg') || name.includes('cm') ? Number(value) : value }));
  };
  
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const calculateGoals = () => {
    const bmr = calculateBMR(formData.gender, formData.current_kg, formData.height_cm, formData.age);
    const tdee = calculateTDEE(bmr, formData.activityLevel);
    const calorieGoal = calculateCalorieGoal(tdee, formData.goal, formData.rate);
    const macroGoals = calculateMacroGrams({ protein: 30, carbs: 40, fats: 30 }, calorieGoal); // Default balanced preset
    setFinalGoals({ calorieGoal, macroGoals });
    nextStep();
  };

  const handleFinish = () => {
    if (!finalGoals) return;
    onComplete({
      age: formData.age,
      gender: formData.gender,
      height: formData.height_cm,
      currentWeight: formData.current_kg,
      targetWeight: formData.target_kg,
      activityLevel: formData.activityLevel,
      goal: formData.goal,
      rate: formData.rate,
      calorieGoal: finalGoals.calorieGoal,
      macroGoals: finalGoals.macroGoals,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={formData} handleChange={handleChange} next={nextStep} />;
      case 2:
        return <Step2 data={formData} handleChange={handleChange} next={nextStep} prev={prevStep} />;
      case 3:
        return <Step3 data={formData} handleChange={handleChange} next={calculateGoals} prev={prevStep} />;
      case 4:
        return <Step4 goals={finalGoals} finish={handleFinish} prev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100 dark:bg-slate-800">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8 transition-all duration-300">
        <h1 className="text-2xl font-bold text-center mb-2 text-green-600">Welcome to AI Calorie Counter</h1>
        <p className="text-center text-slate-500 mb-6">Let's set up your profile.</p>
        <div className="relative h-1 bg-slate-200 dark:bg-slate-700 rounded-full mb-8">
            <div className="absolute top-0 left-0 h-1 bg-green-500 rounded-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

// Helper components for steps
const Step1 = ({ data, handleChange, next }: any) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-center">About You</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Age</label>
        <input type="number" name="age" value={data.age} onChange={handleChange} className="w-full mt-1 p-2 border rounded" min="18" max="100" />
      </div>
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select name="gender" value={data.gender} onChange={handleChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-slate-800">
          <option value={Gender.Male}>Male</option>
          <option value={Gender.Female}>Female</option>
        </select>
      </div>
    </div>
    <button onClick={next} className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Next</button>
  </div>
);

const Step2 = ({ data, handleChange, next, prev }: any) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-center">Your Measurements</h2>
    <div className="space-y-4">
       <div>
        <label className="block text-sm font-medium">Height (cm)</label>
        <input type="number" name="height_cm" value={data.height_cm} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Current Weight (kg)</label>
        <input type="number" name="current_kg" value={data.current_kg} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
      </div>
       <div>
        <label className="block text-sm font-medium">Target Weight (kg)</label>
        <input type="number" name="target_kg" value={data.target_kg} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
      </div>
    </div>
    <div className="flex justify-between mt-6">
      <button onClick={prev} className="bg-slate-200 text-slate-800 py-2 px-4 rounded-lg hover:bg-slate-300 transition">Back</button>
      <button onClick={next} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Next</button>
    </div>
  </div>
);

const Step3 = ({ data, handleChange, next, prev }: any) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-center">Your Goals</h2>
    <div className="space-y-4">
       <div>
        <label className="block text-sm font-medium">Activity Level</label>
        <select name="activityLevel" value={data.activityLevel} onChange={handleChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-slate-800">
          <option value={ActivityLevel.Sedentary}>Sedentary</option>
          <option value={ActivityLevel.LightlyActive}>Lightly Active</option>
          <option value={ActivityLevel.ModeratelyActive}>Moderately Active</option>
          <option value={ActivityLevel.VeryActive}>Very Active</option>
          <option value={ActivityLevel.ExtremelyActive}>Extremely Active</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Primary Goal</label>
        <select name="goal" value={data.goal} onChange={handleChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-slate-800">
          <option value={Goal.Lose}>Lose Weight</option>
          <option value={Goal.Maintain}>Maintain Weight</option>
          <option value={Goal.Gain}>Gain Weight</option>
        </select>
      </div>
      {data.goal !== Goal.Maintain && (
        <div>
          <label className="block text-sm font-medium">Rate</label>
          <select name="rate" value={data.rate} onChange={handleChange} className="w-full mt-1 p-2 border rounded bg-white dark:bg-slate-800">
            <option value={WeightGoalRate.Slow}>Slow</option>
            <option value={WeightGoalRate.Moderate}>Moderate</option>
            <option value={WeightGoalRate.Aggressive}>Aggressive</option>
          </select>
        </div>
      )}
    </div>
    <div className="flex justify-between mt-6">
      <button onClick={prev} className="bg-slate-200 text-slate-800 py-2 px-4 rounded-lg hover:bg-slate-300 transition">Back</button>
      <button onClick={next} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Calculate Goals</button>
    </div>
  </div>
);

const Step4 = ({ goals, finish, prev }: any) => (
    <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Your Daily Goals</h2>
        {goals ? (
            <div className="text-center bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <p className="text-lg text-slate-600 dark:text-slate-300">We recommend a daily goal of:</p>
                <p className="text-4xl font-bold my-2 text-green-600">{Math.round(goals.calorieGoal)}</p>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">Calories</p>
                <div className="flex justify-around text-sm text-slate-500">
                    <div>
                        <p className="font-bold text-base text-sky-500">{Math.round(goals.macroGoals.protein)}g</p>
                        <p>Protein</p>
                    </div>
                    <div>
                        <p className="font-bold text-base text-orange-500">{Math.round(goals.macroGoals.carbs)}g</p>
                        <p>Carbs</p>
                    </div>
                    <div>
                        <p className="font-bold text-base text-yellow-500">{Math.round(goals.macroGoals.fats)}g</p>
                        <p>Fats</p>
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-4">You can adjust these goals later in settings.</p>
            </div>
        ) : (
            <p className="text-center">Calculating...</p>
        )}
        <div className="flex justify-between mt-6">
            <button onClick={prev} className="bg-slate-200 text-slate-800 py-2 px-4 rounded-lg hover:bg-slate-300 transition">Back</button>
            <button onClick={finish} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Let's Get Started!</button>
        </div>
    </div>
);


export default Onboarding;
