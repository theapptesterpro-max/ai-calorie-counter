import { AIFoodItem } from '../types';

export const analyzeFoodImage = async (base64Image: string): Promise<AIFoodItem[]> => {
  try {
    // This is the URL of the backend API you deployed on Hostinger.
    // Replace with your actual domain if it's different.
    const backendUrl = `/api/analyze-food`;

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ base64Image }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const results = await response.json();
    return results as AIFoodItem[];

  } catch (error) {
    console.error("Error calling backend service:", error);
    throw new Error("Failed to analyze image. Please check your connection or try again.");
  }
};
