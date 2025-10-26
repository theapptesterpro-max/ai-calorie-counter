import React, { useState, useRef } from 'react';
import Modal from './Modal';
import { FoodEntry, AIFoodItem } from '../../types';
import { analyzeFoodImage } from '../../services/geminiService';
import { compressImage, getMealTypeForCurrentTime } from '../../utils/helpers';
import AIFoodReviewModal from './AIFoodReviewModal';
import { UploadCloud, AlertCircle } from 'lucide-react';

interface LogWithPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogFoods: (entries: Omit<FoodEntry, 'id' | 'timestamp'>[]) => void;
}

const LogWithPhotoModal: React.FC<LogWithPhotoModalProps> = ({ isOpen, onClose, onLogFoods }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<AIFoodItem[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError("Image size cannot exceed 10MB.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setIsLoading(true);
    setError(null);
    try {
      const compressedBase64 = await compressImage(imageFile, 1024);
      const results = await analyzeFoodImage(compressedBase64);
      if (results && results.length > 0) {
        setAiResults(results);
      } else {
        setError("No food items could be identified. Please try a clearer photo or log manually.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogFromAI = (itemsToLog: AIFoodItem[]) => {
      const newEntries = itemsToLog.map(item => ({
          foodName: item.foodName,
          calories: item.calories,
          protein: item.proteinGrams,
          carbs: item.carbsGrams,
          fats: item.fatsGrams,
          servingSize: item.portionSize,
          mealType: getMealTypeForCurrentTime(),
      }));
      onLogFoods(newEntries);
      handleClose();
  };
  
  const handleClose = () => {
      setImagePreview(null);
      setImageFile(null);
      setIsLoading(false);
      setError(null);
      setAiResults(null);
      onClose();
  }

  if (aiResults) {
      return <AIFoodReviewModal isOpen={true} onClose={handleClose} results={aiResults} onLog={handleLogFromAI} />;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Log Food with Photo">
      <div className="flex flex-col items-center">
        <input type="file" accept="image/jpeg,image/png,image/webp" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        
        {!imagePreview ? (
            <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center hover:border-green-500 transition">
                <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                <span className="mt-2 block text-sm font-medium text-slate-500">Click to upload an image</span>
                <span className="mt-1 block text-xs text-slate-400">PNG, JPG, WEBP up to 10MB</span>
            </button>
        ) : (
            <div className="w-full">
                <img src={imagePreview} alt="Food preview" className="w-full max-h-64 object-contain rounded-lg mb-4" />
                <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-slate-200 text-slate-800 py-2 rounded-lg">Change Image</button>
                    <button onClick={handleAnalyze} disabled={isLoading} className="flex-1 bg-green-600 text-white py-2 rounded-lg disabled:opacity-50">
                        {isLoading ? 'Analyzing...' : 'Analyze Food'}
                    </button>
                </div>
            </div>
        )}

        {isLoading && <div className="mt-4 text-center">Analyzing image, this may take a moment...</div>}
        
        {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
            </div>
        )}
        
        <p className="text-xs text-slate-400 mt-4 text-center">AI provides estimates. Actual nutrition may vary. Please review results before logging.</p>
      </div>
    </Modal>
  );
};

export default LogWithPhotoModal;