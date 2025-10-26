
import React from 'react';

interface CalorieTrackerProps {
  consumed: number;
  goal: number;
}

const CircularProgress: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => {
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
      <circle
        stroke="#e5e7eb"
        className="dark:stroke-slate-700"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset, strokeLinecap: 'round', transition: 'stroke-dashoffset 0.5s ease-out' }}
        transform={`rotate(-90 ${radius} ${radius})`}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const CalorieTracker: React.FC<CalorieTrackerProps> = ({ consumed, goal }) => {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  const remaining = Math.round(goal - consumed);

  const color =
    percentage > 100
      ? '#ef4444' // red-500
      : percentage > 90
      ? '#f59e0b' // amber-500
      : '#22c55e'; // green-500
      
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-full">
      <div className="relative">
        <CircularProgress percentage={Math.min(percentage, 100)} color={color} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold" style={{ color }}>{Math.round(consumed)}</span>
            <span className="text-slate-500">/ {goal}</span>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold">Calories</h3>
        <p className={`text-lg font-medium ${remaining < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {remaining >= 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over`}
        </p>
      </div>
    </div>
  );
};

export default CalorieTracker;
