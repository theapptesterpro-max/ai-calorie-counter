import { GoogleGenAI, Type } from '@google/genai';

// IMPORTANT: Netlify will automatically populate this from your site's environment variables.
const GEMINI_API_KEY = process.env.API_KEY;

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        foodName: {
          type: Type.STRING,
          description: "The identified name of the food item (e.g., 'Scrambled Eggs').",
        },
        portionSize: {
          type: Type.STRING,
          description: "An estimated portion size for the identified food (e.g., '2 large eggs', '1 cup', '150g').",
        },
        calories: {
          type: Type.NUMBER,
          description: "Estimated total calories for the portion.",
        },
        proteinGrams: {
          type: Type.NUMBER,
          description: "Estimated grams of protein for the portion.",
        },
        carbsGrams: {
          type: Type.NUMBER,
          description: "Estimated grams of carbohydrates for the portion.",
        },
        fatsGrams: {
          type: Type.NUMBER,
          description: "Estimated grams of fat for the portion.",
        },
        confidence: {
            type: Type.STRING,
            description: "Confidence level of the estimation, one of 'high', 'medium', or 'low'.",
        },
      },
      required: ["foodName", "portionSize", "calories", "proteinGrams", "carbsGrams", "fatsGrams", "confidence"],
    },
};

export const handler = async (event) => {
  // Check for the API key at the start of every request.
  if (!GEMINI_API_KEY) {
    console.error("API_KEY environment variable is not set.");
    return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "Server configuration error: API key is missing." })
    };
  }
  
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { base64Image } = JSON.parse(event.body);

    if (!base64Image) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Image data is required.' }),
      };
    }

    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };

    const textPart = {
      text: `Analyze the food items in this image. For each distinct item, provide a detailed nutritional breakdown. The response must be a JSON array of objects.`,
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            systemInstruction: "You are an expert nutrition analysis API. Your job is to identify all food items in an image and return a structured JSON response. Do not include any introductory text, markdown formatting, or explanations. Only output the raw JSON array."
        }
    });

    const jsonString = response.text;
    
    // Validate that the response is valid JSON before returning
    JSON.parse(jsonString);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: jsonString,
    };

  } catch (error) {
    console.error('Error in Netlify function:', error);
    const errorMessage = error.message || 'Failed to analyze image with AI.';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};
