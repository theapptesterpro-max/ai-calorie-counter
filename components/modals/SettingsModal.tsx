import React, { useState, useEffect, useMemo } from 'react';
import Modal from './Modal';
import Tabs from '../ui/Tabs';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { UserProfile, Gender, ActivityLevel, Goal, WeightGoalRate, MacroGoals } from '../../types';
import { calculateBMR, calculateTDEE, calculateCalorieGoal, calculateMacroGrams } from '../../utils/helpers';
import { MACRO_PRESETS } from '../../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
}

type MacroMode = 'percentage' | 'grams';

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, userProfile, onSave }) => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [macroMode, setMacroMode] = useState<MacroMode>('percentage');
  const [macroPercentages, setMacroPercentages] = useState({ protein: 30, carbs: 40, fats: 30 });

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumericInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: Number(value) || 0 }));
  };

  const recommendedGoals = useMemo(() => {
    const bmr = calculateBMR(formData.gender, formData.currentWeight, formData.height, formData.age);
    const tdee = calculateTDEE(bmr, formData.activityLevel);
    const calorieGoal = calculateCalorieGoal(tdee, formData.goal, formData.rate);
    return { calorieGoal, tdee };
  }, [formData.gender, formData.currentWeight, formData.height, formData.age, formData.activityLevel, formData.goal, formData.rate]);

  // Effect to update calorie goal automatically if not manually set
  useEffect(() => {
    setFormData(prev => ({ ...prev, calorieGoal: recommendedGoals.calorieGoal }));
  }, [recommendedGoals.calorieGoal]);
  
  // Effect to update macro grams when calorie goal or percentages change
  useEffect(() => {
    if (macroMode === 'percentage') {
      const newMacroGrams = calculateMacroGrams(macroPercentages, formData.calorieGoal);
      setFormData(prev => ({ ...prev, macroGoals: newMacroGrams }));
    }
  }, [formData.calorieGoal, macroPercentages, macroMode]);

  const handleMacroPercentageChange = (macro: 'protein' | 'carbs' | 'fats', value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    const current = { ...macroPercentages, [macro]: newValue };
    const total = current.protein + current.carbs + current.fats;
    
    if (total > 100) {
      // Adjust carbs by default to maintain 100% total
      const diff = total - 100;
      if (macro !== 'carbs') {
        current.carbs = Math.max(0, current.carbs - diff);
      } else { // if carbs was changed, adjust protein
        current.protein = Math.max(0, current.protein - diff);
      }
    }
    setMacroPercentages(current);
  };
  
  const handleMacroGramChange = (macro: keyof MacroGoals, value: number) => {
    setFormData(prev => ({
        ...prev,
        macroGoals: {
            ...prev.macroGoals,
            [macro]: value
        }
    }));
  };

  const handleSave = () => {
    // Ensure the final macro goals are based on the current mode
    let finalProfile = { ...formData };
    if (macroMode === 'percentage') {
        finalProfile.macroGoals = calculateMacroGrams(macroPercentages, formData.calorieGoal);
    }
    onSave(finalProfile);
    onClose();
  };
  
  const totalMacroCalories = (formData.macroGoals.protein * 4) + (formData.macroGoals.carbs * 4) + (formData.macroGoals.fats * 9);


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings & Goals">
      <Tabs tabs={['Profile', 'Calories', 'Macros']} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="py-6 space-y-6">
        {activeTab === 'Profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Age" type="number" value={formData.age} onChange={e => handleNumericInputChange('age', e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
              <select value={formData.gender} onChange={e => handleInputChange('gender', e.target.value as Gender)} className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
              </select>
            </div>
            <Input label="Height (cm)" type="number" value={formData.height} onChange={e => handleNumericInputChange('height', e.target.value)} />
            <Input label="Current Weight (kg)" type="number" value={formData.currentWeight} onChange={e => handleNumericInputChange('currentWeight', e.target.value)} />
            <Input label="Target Weight (kg)" type="number" value={formData.targetWeight} onChange={e => handleNumericInputChange('targetWeight', e.target.value)} />
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Activity Level</label>
                <select value={formData.activityLevel} onChange={e => handleInputChange('activityLevel', e.target.value as ActivityLevel)} className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    {Object.entries(ActivityLevel).map(([key, value]) => <option key={value} value={value}>{key.replace(/([A-Z])/g, ' $1').trim()}</option>)}
                </select>
            </div>
          </div>
        )}
        
        {activeTab === 'Calories' && (
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Primary Goal</label>
                    <select value={formData.goal} onChange={e => handleInputChange('goal', e.target.value as Goal)} className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                      <option value={Goal.Lose}>Lose Weight</option>
                      <option value={Goal.Maintain}>Maintain Weight</option>
                      <option value={Goal.Gain}>Gain Weight</option>
                    </select>
                </div>
                {formData.goal !== Goal.Maintain && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rate</label>
                        <select value={formData.rate || ''} onChange={e => handleInputChange('rate', e.target.value as WeightGoalRate)} className="w-full p-2 border rounded bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                            <option value={WeightGoalRate.Slow}>Slow</option>
                            <option value={WeightGoalRate.Moderate}>Moderate</option>
                            <option value={WeightGoalRate.Aggressive}>Aggressive</option>
                        </select>
                    </div>
                )}
                 <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Maintenance Calories (TDEE)</p>
                    <p className="text-2xl font-bold">{Math.round(recommendedGoals.tdee)}</p>
                </div>
                <Input label="Daily Calorie Goal" type="number" value={formData.calorieGoal} onChange={e => handleNumericInputChange('calorieGoal', e.target.value)} helperText={`Recommended: ${Math.round(recommendedGoals.calorieGoal)}`} />
            </div>
        )}
        
        {activeTab === 'Macros' && (
            <div className="space-y-4">
                <div className="flex justify-center p-1 bg-slate-200 dark:bg-slate-700 rounded-lg">
                    <Button variant={macroMode === 'percentage' ? 'primary' : 'ghost'} onClick={() => setMacroMode('percentage')} className="flex-1">Percentage</Button>
                    <Button variant={macroMode === 'grams' ? 'primary' : 'ghost'} onClick={() => setMacroMode('grams')} className="flex-1">Grams</Button>
                </div>

                {macroMode === 'percentage' ? (
                    <div className="space-y-3">
                        <div className="flex justify-center flex-wrap gap-2">
                            {MACRO_PRESETS.map(p => <Button key={p.name} size="sm" variant="secondary" onClick={() => setMacroPercentages(p.values)}>{p.name}</Button>)}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <label>Protein (%)</label>
                                <Input type="number" value={macroPercentages.protein} onChange={e => handleMacroPercentageChange('protein', Number(e.target.value))} />
                                <span className="text-sm text-slate-500">{Math.round(formData.macroGoals.protein)}g</span>
                            </div>
                             <div>
                                <label>Carbs (%)</label>
                                <Input type="number" value={macroPercentages.carbs} onChange={e => handleMacroPercentageChange('carbs', Number(e.target.value))} />
                                <span className="text-sm text-slate-500">{Math.round(formData.macroGoals.carbs)}g</span>
                            </div>
                             <div>
                                <label>Fats (%)</label>
                                <Input type="number" value={macroPercentages.fats} onChange={e => handleMacroPercentageChange('fats', Number(e.target.value))} />
                                <span className="text-sm text-slate-500">{Math.round(formData.macroGoals.fats)}g</span>
                            </div>
                        </div>
                    </div>
                ) : (
                     <div className="space-y-3">
                         <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <label>Protein (g)</label>
                                <Input type="number" value={Math.round(formData.macroGoals.protein)} onChange={e => handleMacroGramChange('protein', Number(e.target.value))} />
                            </div>
                             <div>
                                <label>Carbs (g)</label>
                                <Input type="number" value={Math.round(formData.macroGoals.carbs)} onChange={e => handleMacroGramChange('carbs', Number(e.target.value))} />
                            </div>
                             <div>
                                <label>Fats (g)</label>
                                <Input type="number" value={Math.round(formData.macroGoals.fats)} onChange={e => handleMacroGramChange('fats', Number(e.target.value))} />
                            </div>
                        </div>
                         <div className={`p-3 rounded-lg text-center ${totalMacroCalories > formData.calorieGoal + 50 ? 'bg-red-100 dark:bg-red-900/30 text-red-700' : 'bg-slate-100 dark:bg-slate-700'}`}>
                             <p className="text-sm">Total: {Math.round(totalMacroCalories)} cal (Goal: {formData.calorieGoal} cal)</p>
                         </div>
                    </div>
                )}
            </div>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4 p-4 border-t border-slate-200 dark:border-slate-700">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </div>
    </Modal>
  );
};

export default SettingsModal;