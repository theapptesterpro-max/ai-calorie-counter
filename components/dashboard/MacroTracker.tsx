
import React from 'react';
import { MacroGoals } from '../../types';

interface MacroTrackerProps {
  totals: {
    protein: number;
    carbs: number;
    fats: number;
  };
  goals: MacroGoals;
}

interface ProgressBarProps {
  label: string;
  consumed: number;
  goal: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, consumed, goal, color }) => {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  const safePercentage = Math.min(percentage, 100);

  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm text-slate-500">
          {Math.round(consumed)}g / {Math.round(goal)}g
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
        <div
          className="rounded-full h-3"
          style={{ width: `${safePercentage}%`, backgroundColor: color, transition: 'width 0.5s ease-in-out' }}
        ></div>
      </div>
    </div>
  );
};

const MacroTracker: React.FC<MacroTrackerProps> = ({ totals, goals }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-full flex flex-col justify-center">
      <h3 className="text-xl font-semibold mb-4 text-center">Macronutrients</h3>
      <div className="space-y-4">
        <ProgressBar label="Protein" consumed={totals.protein} goal={goals.protein} color="#38bdf8" />
        <ProgressBar label="Carbohydrates" consumed={totals.carbs} goal={goals.carbs} color="#fb923c" />
        <ProgressBar label="Fats" consumed={totals.fats} goal={goals.fats} color="#facc15" />
      </div>
    </div>
  );
};

export default MacroTracker;
