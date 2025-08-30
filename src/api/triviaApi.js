const BASE_URL = "https://opentdb.com/api.php";
const CATEGORIES_URL = "https://opentdb.com/api_category.php";

/**
 * Fetch all available categories from the Open Trivia Database
 * @returns {Promise<Array>} Array of category objects
 */
export const getCategories = async () => {
  try {
    const response = await fetch(CATEGORIES_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.trivia_categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories. Please try again later.");
  }
};

/**
 * Fetch questions from the Open Trivia Database
 * @param {Object} params - Query parameters
 * @param {number} params.amount - Number of questions
 * @param {number} params.category - Category ID
 * @param {string} params.difficulty - Difficulty level (easy, medium, hard)
 * @returns {Promise<Array>} Array of question objects
 */
export const getQuestions = async ({ amount, category, difficulty }) => {
  try {
    const params = new URLSearchParams({
      amount: amount.toString(),
      type: "multiple",
    });

    if (category && category !== "any") {
      params.append("category", category.toString());
    }

    if (difficulty && difficulty !== "any") {
      params.append("difficulty", difficulty);
    }

    const url = `${BASE_URL}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.response_code === 1) {
      throw new Error(
        "No questions available for the selected criteria. Please try different settings."
      );
    }

    if (data.response_code === 2) {
      throw new Error("Invalid parameters. Please check your quiz settings.");
    }

    if (data.response_code === 3) {
      throw new Error("Session token expired. Please try again.");
    }

    if (data.response_code === 4) {
      throw new Error(
        "All questions for the selected criteria have been used. Please try different settings."
      );
    }

    return data.results || [];
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

/**
 * Decode HTML entities in text
 * @param {string} text - Text with HTML entities
 * @returns {string} Decoded text
 */
export const decodeHtml = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
