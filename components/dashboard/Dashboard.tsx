import React, { useState, useMemo, useCallback } from 'react';
import { UserProfile, DailyLog, FoodEntry, MealType } from '../../types';
import { formatDate } from '../../utils/helpers';
import CalorieTracker from './CalorieTracker';
import MacroTracker from './MacroTracker';
import MealSection from './MealSection';
import AddFoodModal from '../modals/AddFoodModal';
import LogWithPhotoModal from '../modals/LogWithPhotoModal';
import SettingsModal from '../modals/SettingsModal';
import { ChevronLeft, ChevronRight, Plus, Camera, Settings } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
  updateUserProfile: (profile: UserProfile) => void;
  logs: Record<string, DailyLog>;
  updateLogs: (date: string, newLog: DailyLog) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, updateUserProfile, logs, updateLogs }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeModal, setActiveModal] = useState<'addFood' | 'logWithPhoto' | 'settings' | null>(null);

  const dateString = useMemo(() => formatDate(currentDate), [currentDate]);
  const dailyLog = useMemo(() => logs[dateString] || { entries: [] }, [logs, dateString]);

  const addFoodEntry = useCallback((entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: new Date().toISOString() + Math.random(),
      timestamp: new Date().toISOString(),
    };
    const newLog = { entries: [...dailyLog.entries, newEntry] };
    updateLogs(dateString, newLog);
  }, [dailyLog, updateLogs, dateString]);
  
  const addMultipleFoodEntries = useCallback((entries: Omit<FoodEntry, 'id'|'timestamp'>[]) => {
      const newEntries: FoodEntry[] = entries.map(entry => ({
          ...entry,
          id: new Date().toISOString() + Math.random(),
          timestamp: new Date().toISOString(),
      }));
      const newLog = { entries: [...dailyLog.entries, ...newEntries] };
      updateLogs(dateString, newLog);
  }, [dailyLog, updateLogs, dateString]);

  const deleteFoodEntry = (entryId: string) => {
    const newEntries = dailyLog.entries.filter(e => e.id !== entryId);
    const newLog = { entries: newEntries };
    updateLogs(dateString, newLog);
  };
  
  const copyYesterday = () => {
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = formatDate(yesterday);
    const yesterdayLog = logs[yesterdayString];

    if (yesterdayLog && yesterdayLog.entries.length > 0) {
        const entriesToCopy = yesterdayLog.entries.map(({ id, timestamp, ...rest }) => rest);
        addMultipleFoodEntries(entriesToCopy);
    } else {
        alert("No food logged yesterday to copy.");
    }
  };


  const totals = useMemo(() => {
    return dailyLog.entries.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.calories,
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fats: acc.fats + entry.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [dailyLog]);

  const changeDate = (offset: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + offset);
      return newDate;
    });
  };

  const mealEntries = (mealType: MealType) => dailyLog.entries.filter(e => e.mealType === mealType);

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      {/* Header */}
       <header className="flex justify-between items-center my-4">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">My Day</h1>
          <button onClick={() => setActiveModal('settings')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              <Settings size={24} />
          </button>
      </header>

      {/* Date Navigator */}
      <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
        <button onClick={() => changeDate(-1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronLeft size={24} /></button>
        <div className="text-center">
            <p className="font-semibold text-lg">{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <button onClick={() => setCurrentDate(new Date())} className="text-sm text-green-600 hover:underline">Go to Today</button>
        </div>
        <button onClick={() => changeDate(1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronRight size={24} /></button>
      </div>

      {/* Main Trackers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <CalorieTracker consumed={totals.calories} goal={userProfile.calorieGoal} />
        </div>
        <div className="lg:col-span-2">
          <MacroTracker totals={totals} goals={userProfile.macroGoals} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button onClick={() => setActiveModal('addFood')} className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition shadow-md font-semibold">
              <Plus size={20}/> Add Food
          </button>
          <button onClick={() => setActiveModal('logWithPhoto')} className="flex items-center justify-center gap-2 w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition shadow-md font-semibold">
              <Camera size={20}/> Log with Photo
          </button>
          <button onClick={copyYesterday} className="flex items-center justify-center gap-2 w-full bg-slate-500 text-white py-3 rounded-lg hover:bg-slate-600 transition shadow-md font-semibold">
              Copy Yesterday
          </button>
      </div>

      {/* Meal Sections */}
      <div className="space-y-4">
        <MealSection title={MealType.Breakfast} entries={mealEntries(MealType.Breakfast)} onDelete={deleteFoodEntry} />
        <MealSection title={MealType.Lunch} entries={mealEntries(MealType.Lunch)} onDelete={deleteFoodEntry} />
        <MealSection title={MealType.Dinner} entries={mealEntries(MealType.Dinner)} onDelete={deleteFoodEntry} />
        <MealSection title={MealType.Snacks} entries={mealEntries(MealType.Snacks)} onDelete={deleteFoodEntry} />
      </div>

      {activeModal === 'addFood' && (
        <AddFoodModal 
          isOpen={true} 
          onClose={() => setActiveModal(null)} 
          onAddFood={addFoodEntry}
          // FIX: Explicitly type `log` to fix type inference issue with Object.values().
          recentFoods={logs ? Object.values(logs).flatMap((log: DailyLog) => log.entries).slice(-20) : []}
        />
      )}
      
      {activeModal === 'logWithPhoto' && (
        <LogWithPhotoModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onLogFoods={addMultipleFoodEntries}
        />
      )}
      
      {activeModal === 'settings' && (
        <SettingsModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          userProfile={userProfile}
          onSave={(updatedProfile) => {
            updateUserProfile(updatedProfile);
            setActiveModal(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;