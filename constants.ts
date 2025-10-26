import { FoodItem } from './types';

export const FOOD_DATABASE: FoodItem[] = [
  // Proteins
  { id: '1', name: 'Chicken Breast (cooked)', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: '2', name: 'Salmon (cooked)', calories: 206, protein: 22, carbs: 0, fats: 13 },
  { id: '3', name: 'Egg (large, boiled)', calories: 155, protein: 13, carbs: 1.1, fats: 11 },
  { id: '4', name: 'Tofu (firm)', calories: 76, protein: 8, carbs: 1.9, fats: 4.8 },
  { id: '5', name: 'Ground Beef (85% lean, cooked)', calories: 217, protein: 26, carbs: 0, fats: 11 },
  { id: '6', name: 'Turkey Breast (cooked)', calories: 135, protein: 30, carbs: 0, fats: 1 },
  { id: '7', name: 'Shrimp (cooked)', calories: 99, protein: 24, carbs: 0.2, fats: 0.3 },
  { id: '8', name: 'Tuna (canned in water)', calories: 116, protein: 26, carbs: 0, fats: 1 },
  { id: '9', name: 'Pork Chop (cooked)', calories: 221, protein: 29, carbs: 0, fats: 11 },
  { id: '10', name: 'Greek Yogurt (plain, non-fat)', calories: 59, protein: 10, carbs: 3.6, fats: 0.4 },
  
  // Grains
  { id: '11', name: 'White Rice (cooked)', calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
  { id: '12', name: 'Brown Rice (cooked)', calories: 111, protein: 2.6, carbs: 23, fats: 0.9 },
  { id: '13', name: 'Pasta (cooked)', calories: 131, protein: 5, carbs: 25, fats: 1.1 },
  { id: '14', name: 'Quinoa (cooked)', calories: 120, protein: 4.1, carbs: 21, fats: 1.9 },
  { id: '15', name: 'Oats (rolled, dry)', calories: 389, protein: 17, carbs: 66, fats: 7 },
  { id: '16', name: 'White Bread', calories: 265, protein: 9, carbs: 49, fats: 3.2 },
  { id: '17', name: 'Whole Wheat Bread', calories: 247, protein: 13, carbs: 41, fats: 3.4 },
  { id: '18', name: 'Couscous (cooked)', calories: 112, protein: 3.8, carbs: 23, fats: 0.2 },

  // Dairy
  { id: '21', name: 'Whole Milk', calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3 },
  { id: '22', name: 'Skim Milk', calories: 35, protein: 3.4, carbs: 5, fats: 0.1 },
  { id: '23', name: 'Cheddar Cheese', calories: 404, protein: 25, carbs: 1.3, fats: 33 },
  { id: '24', name: 'Mozzarella Cheese', calories: 280, protein: 28, carbs: 3.1, fats: 17 },
  { id: '25', name: 'Butter', calories: 717, protein: 0.9, carbs: 0.1, fats: 81 },
  { id: '26', name: 'Cottage Cheese (2% fat)', calories: 81, protein: 14, carbs: 3.4, fats: 2.3 },
  { id: '27', name: 'Cream Cheese', calories: 342, protein: 6, carbs: 5.5, fats: 34 },
  
  // Fruits
  { id: '31', name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fats: 0.3 },
  { id: '32', name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
  { id: '33', name: 'Orange', calories: 47, protein: 0.9, carbs: 12, fats: 0.1 },
  { id: '34', name: 'Strawberries', calories: 32, protein: 0.7, carbs: 8, fats: 0.3 },
  { id: '35', name: 'Blueberries', calories: 57, protein: 0.7, carbs: 14, fats: 0.3 },
  { id: '36', name: 'Grapes', calories: 69, protein: 0.7, carbs: 18, fats: 0.2 },
  { id: '37', name: 'Mango', calories: 60, protein: 0.8, carbs: 15, fats: 0.4 },
  { id: '38', name: 'Avocado', calories: 160, protein: 2, carbs: 9, fats: 15 },
  { id: '39', name: 'Watermelon', calories: 30, protein: 0.6, carbs: 8, fats: 0.2 },
  
  // Vegetables
  { id: '41', name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fats: 0.4 },
  { id: '42', name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4 },
  { id: '43', name: 'Carrots', calories: 41, protein: 0.9, carbs: 10, fats: 0.2 },
  { id: '44', name: 'Tomatoes', calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2 },
  { id: '45', name: 'Bell Pepper (red)', calories: 31, protein: 1, carbs: 6, fats: 0.3 },
  { id: '46', name: 'Lettuce (iceberg)', calories: 14, protein: 0.9, carbs: 3, fats: 0.1 },
  { id: '47', name: 'Cucumber', calories: 15, protein: 0.7, carbs: 3.6, fats: 0.1 },
  { id: '48', name: 'Onions', calories: 40, protein: 1.1, carbs: 9, fats: 0.1 },
  { id: '49', name: 'Potatoes (boiled)', calories: 87, protein: 1.9, carbs: 20, fats: 0.1 },
  
  // Fats/Nuts
  { id: '51', name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fats: 100 },
  { id: '52', name: 'Almonds', calories: 579, protein: 21, carbs: 22, fats: 49 },
  { id: '53', name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fats: 50 },
  { id: '54', name: 'Walnuts', calories: 654, protein: 15, carbs: 14, fats: 65 },
  { id: '55', name: 'Cashews', calories: 553, protein: 18, carbs: 30, fats: 44 },
  { id: '56', name: 'Sunflower Seeds', calories: 584, protein: 21, carbs: 20, fats: 51 },

  // Common Items
  { id: '61', name: 'Pizza Slice (pepperoni)', calories: 285, protein: 12, carbs: 36, fats: 10 },
  { id: '62', name: 'Hamburger', calories: 250, protein: 13, carbs: 28, fats: 9 },
  { id: '63', name: 'Turkey Sandwich', calories: 200, protein: 18, carbs: 24, fats: 4 },
  { id: '64', name: 'Caesar Salad with Chicken', calories: 260, protein: 20, carbs: 8, fats: 16 },
  { id: '65', name: 'French Fries', calories: 312, protein: 3.4, carbs: 41, fats: 15 },
  { id: '66', name: 'Chicken Burrito', calories: 450, protein: 25, carbs: 55, fats: 15 }
];
// Add more items to reach 100+
FOOD_DATABASE.push(
  { id: '101', name: 'Lentils (cooked)', calories: 116, protein: 9, carbs: 20, fats: 0.4 },
  { id: '102', name: 'Chickpeas (cooked)', calories: 139, protein: 7.6, carbs: 22, fats: 3.8 },
  { id: '103', name: 'Black Beans (cooked)', calories: 132, protein: 8.9, carbs: 24, fats: 0.5 },
  { id: '104', name: 'Cod (cooked)', calories: 105, protein: 23, carbs: 0, fats: 0.7 },
  { id: '105', name: 'Sardines (canned in oil)', calories: 208, protein: 25, carbs: 0, fats: 11 },
  { id: '106', name: 'Bacon (cooked)', calories: 541, protein: 37, carbs: 1.4, fats: 42 },
  { id: '107', name: 'Sausage (pork, cooked)', calories: 334, protein: 20, carbs: 1.5, fats: 27 },
  { id: '108', name: 'Bagel (plain)', calories: 250, protein: 10, carbs: 50, fats: 1.5 },
  { id: '109', name: 'Croissant', calories: 406, protein: 8, carbs: 46, fats: 21 },
  { id: '110', name: 'Muffin (blueberry)', calories: 377, protein: 5, carbs: 53, fats: 16 },
  { id: '111', name: 'Pancakes (plain)', calories: 227, protein: 6, carbs: 45, fats: 2.7 },
  { id: '112', name: 'Waffles (plain)', calories: 291, protein: 8, carbs: 50, fats: 6 },
  { id: '113', name: 'Feta Cheese', calories: 264, protein: 14, carbs: 4.1, fats: 21 },
  { id: '114', name: 'Parmesan Cheese', calories: 431, protein: 38, carbs: 4.1, fats: 29 },
  { id: '115', name: 'Sour Cream', calories: 193, protein: 2.4, carbs: 4.6, fats: 19 },
  { id: '116', name: 'Pineapple', calories: 50, protein: 0.5, carbs: 13, fats: 0.1 },
  { id: '117', name: 'Peach', calories: 39, protein: 0.9, carbs: 10, fats: 0.3 },
  { id: '118', name: 'Pear', calories: 57, protein: 0.4, carbs: 15, fats: 0.1 },
  { id: '119', name: 'Cherries', calories: 50, protein: 1, carbs: 12, fats: 0.3 },
  { id: '120', name: 'Kiwi', calories: 61, protein: 1.1, carbs: 15, fats: 0.5 },
  { id: '121', name: 'Asparagus', calories: 20, protein: 2.2, carbs: 3.9, fats: 0.1 },
  { id: '122', name: 'Mushroom', calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3 },
  { id: '123', name: 'Zucchini', calories: 17, protein: 1.2, carbs: 3.1, fats: 0.3 },
  { id: '124', name: 'Eggplant', calories: 25, protein: 1, carbs: 6, fats: 0.2 },
  { id: '125', name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fats: 0.1 },
  { id: '126', name: 'Corn', calories: 86, protein: 3.2, carbs: 19, fats: 1.2 },
  { id: '127', name: 'Peas', calories: 81, protein: 5.4, carbs: 14, fats: 0.4 },
  { id: '128', name: 'Canola Oil', calories: 884, protein: 0, carbs: 0, fats: 100 },
  { id: '129', name: 'Coconut Oil', calories: 862, protein: 0, carbs: 0, fats: 100 },
  { id: '130', name: 'Pistachios', calories: 562, protein: 20, carbs: 28, fats: 45 },
  { id: '131', name: 'Pecans', calories: 691, protein: 9, carbs: 14, fats: 72 },
  { id: '132', name: 'Chia Seeds', calories: 486, protein: 17, carbs: 42, fats: 31 },
  { id: '133', name: 'Flax Seeds', calories: 534, protein: 18, carbs: 29, fats: 42 },
  { id: '134', name: 'Ice Cream (vanilla)', calories: 207, protein: 3.5, carbs: 24, fats: 11 },
  { id: '135', name: 'Chocolate (dark, 70-85%)', calories: 598, protein: 7.8, carbs: 46, fats: 43 },
  { id: '136', name: 'Popcorn (air-popped)', calories: 387, protein: 13, carbs: 78, fats: 4.5 },
  { id: '137', name: 'Pretzels', calories: 380, protein: 10, carbs: 80, fats: 2.5 },
  { id: '138', name: 'Potato Chips', calories: 536, protein: 7, carbs: 53, fats: 35 },
  { id: '139', name: 'Hummus', calories: 166, protein: 7.9, carbs: 14, fats: 9.6 },
  { id: '140', name: 'Sushi (salmon roll)', calories: 150, protein: 8, carbs: 25, fats: 2 }
);

// Indian Food Items
FOOD_DATABASE.push(
  { id: '201', name: 'Roti / Chapati', calories: 297, protein: 11, carbs: 60, fats: 2 },
  { id: '202', name: 'Naan Bread', calories: 317, protein: 10, carbs: 57, fats: 5 },
  { id: '203', name: 'Dal (lentil soup, cooked)', calories: 105, protein: 7, carbs: 18, fats: 1 },
  { id: '204', name: 'Paneer (Indian cheese)', calories: 296, protein: 18, carbs: 6, fats: 22 },
  { id: '205', name: 'Basmati Rice (cooked)', calories: 135, protein: 4, carbs: 28, fats: 0.5 },
  { id: '206', name: 'Chicken Tikka Masala', calories: 180, protein: 14, carbs: 8, fats: 10 },
  { id: '207', name: 'Samosa (vegetable, fried)', calories: 262, protein: 4, carbs: 32, fats: 14 },
  { id: '208', name: 'Chole (chickpea curry)', calories: 150, protein: 7, carbs: 22, fats: 4 },
  { id: '209', name: 'Palak Paneer', calories: 160, protein: 10, carbs: 8, fats: 11 },
  { id: '210', name: 'Aloo Gobi', calories: 98, protein: 3, carbs: 13, fats: 4 },
  { id: '211', name: 'Butter Chicken (Murgh Makhani)', calories: 210, protein: 15, carbs: 6, fats: 14 },
  { id: '212', name: 'Biryani (chicken)', calories: 290, protein: 18, carbs: 35, fats: 8 },
  { id: '213', name: 'Raita (yogurt dip)', calories: 60, protein: 3, carbs: 5, fats: 3 },
  { id: '214', name: 'Idli (steamed rice cake)', calories: 160, protein: 4, carbs: 36, fats: 0.4 },
  { id: '215', name: 'Dosa (plain)', calories: 168, protein: 4, carbs: 32, fats: 2.5 },
  { id: '216', name: 'Vada Pav', calories: 300, protein: 7, carbs: 48, fats: 9 },
  { id: '217', name: 'Gulab Jamun (1 piece)', calories: 150, protein: 2, carbs: 25, fats: 4.5 },
  { id: '218', name: 'Jalebi (1 piece)', calories: 100, protein: 1, carbs: 22, fats: 1 },
  { id: '219', name: 'Tandoori Chicken', calories: 220, protein: 26, carbs: 2, fats: 12 },
  { id: '220', name: 'Ghee', calories: 899, protein: 0, carbs: 0, fats: 100 }
);


export const MACRO_PRESETS = [
  { name: 'Balanced', values: { protein: 30, carbs: 40, fats: 30 } },
  { name: 'High Protein', values: { protein: 40, carbs: 30, fats: 30 } },
  { name: 'Low Carb', values: { protein: 30, carbs: 15, fats: 55 } },
  { name: 'Keto', values: { protein: 25, carbs: 5, fats: 70 } },
  { name: 'High Carb', values: { protein: 20, carbs: 60, fats: 20 } },
];