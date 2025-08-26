import { useState, useEffect } from "react";
import { getCategories } from "../api/triviaApi";
import SearchBar from "./SearchBar";

const QuizStart = ({ onStartQuiz, loading }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  const [settings, setSettings] = useState({
    amount: 10,
    category: "any",
    difficulty: "any",
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        setFilteredCategories(fetchedCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle search filtering
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredCategories(categories);
      return;
    }

    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onStartQuiz(settings);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loadingCategories) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-lg font-medium">Failed to load categories</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Customize Your Quiz
          </h1>
          <p className="text-gray-600">
            Choose your preferences and start testing your knowledge!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Number of Questions */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Number of Questions
            </label>
            <select
              id="amount"
              value={settings.amount}
              onChange={(e) =>
                handleInputChange("amount", parseInt(e.target.value))
              }
              className="input-field"
              disabled={loading}
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={25}>25 Questions</option>
              <option value={30}>30 Questions</option>
            </select>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["easy", "medium", "hard"].map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => handleInputChange("difficulty", difficulty)}
                  className={`difficulty-btn ${
                    settings.difficulty === difficulty ? "active" : ""
                  } capitalize`}
                  disabled={loading}
                >
                  {difficulty}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleInputChange("difficulty", "any")}
              className={`difficulty-btn mt-3 w-full ${
                settings.difficulty === "any" ? "active" : ""
              }`}
              disabled={loading}
            >
              Any Difficulty
            </button>
          </div>

          {/* Category Selection */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>

            {/* Search Bar */}
            <div className="mb-3">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search categories..."
              />
            </div>

            {/* Category Dropdown */}
            <select
              id="category"
              value={settings.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="input-field"
              disabled={loading}
            >
              <option value="any">Any Category</option>
              {filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {filteredCategories.length === 0 && (
              <p className="text-gray-500 text-sm mt-2 text-center">
                No categories match your search. Try a different term.
              </p>
            )}
          </div>

          {/* Start Quiz Button */}
          <button
            type="submit"
            disabled={loading || filteredCategories.length === 0}
            className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading Quiz...
              </div>
            ) : (
              "Start Quiz"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizStart;
