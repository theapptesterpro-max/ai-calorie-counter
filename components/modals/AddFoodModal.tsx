
import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import { FoodEntry, MealType, FoodItem } from '../../types';
import { getMealTypeForCurrentTime } from '../../utils/helpers';
import { FOOD_DATABASE } from '../../constants';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  recentFoods: FoodEntry[];
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose, onAddFood, recentFoods }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'search' | 'recent'>('search');
  
  const [manualForm, setManualForm] = useState({
      foodName: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      servingSize: '1 serving',
      mealType: getMealTypeForCurrentTime(),
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [searchPortion, setSearchPortion] = useState(100);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFood({
        ...manualForm,
        calories: parseFloat(manualForm.calories) || 0,
        protein: parseFloat(manualForm.protein) || 0,
        carbs: parseFloat(manualForm.carbs) || 0,
        fats: parseFloat(manualForm.fats) || 0,
    });
    onClose();
  };

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return FOOD_DATABASE.filter(food => food.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleSearchSelect = (food: FoodItem) => {
    setSelectedFood(food);
  };
  
  const handleSearchAdd = () => {
    if (!selectedFood) return;
    const factor = searchPortion / 100;
    onAddFood({
        foodName: selectedFood.name,
        calories: selectedFood.calories * factor,
        protein: selectedFood.protein * factor,
        carbs: selectedFood.carbs * factor,
        fats: selectedFood.fats * factor,
        servingSize: `${searchPortion}g`,
        mealType: getMealTypeForCurrentTime(),
    });
    setSelectedFood(null);
    setSearchQuery('');
    setSearchPortion(100);
    onClose();
  }

  const handleRecentAdd = (food: FoodEntry) => {
      onAddFood({
          ...food,
          mealType: getMealTypeForCurrentTime(), // update meal type to current
      });
      onClose();
  }

  const uniqueRecentFoods = useMemo(() => {
    const unique = new Map<string, FoodEntry>();
    recentFoods.forEach(food => {
        if (!unique.has(food.foodName.toLowerCase())) {
            unique.set(food.foodName.toLowerCase(), food);
        }
    });
    return Array.from(unique.values());
  }, [recentFoods]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Food to Your Diary">
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          <button onClick={() => setActiveTab('search')} className={`${activeTab === 'search' ? 'border-green-500 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Search</button>
          <button onClick={() => setActiveTab('manual')} className={`${activeTab === 'manual' ? 'border-green-500 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Manual</button>
          <button onClick={() => setActiveTab('recent')} className={`${activeTab === 'recent' ? 'border-green-500 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>Recent</button>
        </nav>
      </div>

      <div className="py-4">
        {activeTab === 'search' && (
            <div>
                <input type="text" placeholder="Search for a food..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full p-2 border rounded" />
                {!selectedFood ? (
                    <ul className="mt-2 max-h-60 overflow-y-auto">
                        {searchResults.map(food => <li key={food.id} onClick={() => handleSearchSelect(food)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer rounded">{food.name}</li>)}
                    </ul>
                ) : (
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-semibold">{selectedFood.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                            <input type="number" value={searchPortion} onChange={e => setSearchPortion(Number(e.target.value))} className="w-24 p-2 border rounded" />
                            <span>grams</span>
                        </div>
                        <button onClick={handleSearchAdd} className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg">Add to Diary</button>
                        <button onClick={() => setSelectedFood(null)} className="mt-4 ml-2 bg-slate-200 text-slate-800 py-2 px-4 rounded-lg">Back to Search</button>
                    </div>
                )}
            </div>
        )}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            {/* Form fields */}
            <input type="text" placeholder="Food Name" value={manualForm.foodName} onChange={e => setManualForm({...manualForm, foodName: e.target.value})} className="w-full p-2 border rounded" required/>
            <input type="number" placeholder="Calories" value={manualForm.calories} onChange={e => setManualForm({...manualForm, calories: e.target.value})} className="w-full p-2 border rounded" required/>
            <div className="grid grid-cols-3 gap-2">
                <input type="number" placeholder="Protein (g)" value={manualForm.protein} onChange={e => setManualForm({...manualForm, protein: e.target.value})} className="w-full p-2 border rounded"/>
                <input type="number" placeholder="Carbs (g)" value={manualForm.carbs} onChange={e => setManualForm({...manualForm, carbs: e.target.value})} className="w-full p-2 border rounded"/>
                <input type="number" placeholder="Fats (g)" value={manualForm.fats} onChange={e => setManualForm({...manualForm, fats: e.target.value})} className="w-full p-2 border rounded"/>
            </div>
            <select value={manualForm.mealType} onChange={e => setManualForm({...manualForm, mealType: e.target.value as MealType})} className="w-full p-2 border rounded bg-white dark:bg-slate-800">
                {Object.values(MealType).map(meal => <option key={meal} value={meal}>{meal}</option>)}
            </select>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">Add Food</button>
          </form>
        )}
        {activeTab === 'recent' && (
            <ul className="max-h-80 overflow-y-auto">
                {uniqueRecentFoods.map(food => (
                    <li key={food.id} onClick={() => handleRecentAdd(food)} className="p-3 flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer rounded">
                        <div>
                            <p className="font-medium">{food.foodName}</p>
                            <p className="text-sm text-slate-500">{food.servingSize} &bull; {Math.round(food.calories)} cal</p>
                        </div>
                        <span className="text-green-500 font-bold">+</span>
                    </li>
                ))}
            </ul>
        )}
      </div>
    </Modal>
  );
};

export default AddFoodModal;
