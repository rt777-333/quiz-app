import { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date"); // 'date', 'score', 'percentage'

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
      );
      setHistory(savedHistory);
    } catch (error) {
      console.error("Failed to load quiz history:", error);
      setHistory([]);
    }
  }, []);

  // Filter and sort history
  const filteredAndSortedHistory = useMemo(() => {
    let filtered = history;

    // Apply search filter
    if (searchTerm) {
      filtered = history.filter(
        (item) =>
          item.score.toString().includes(searchTerm) ||
          item.totalQuestions.toString().includes(searchTerm) ||
          item.scorePercentage.toString().includes(searchTerm)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.score - a.score;
        case "percentage":
          return b.scorePercentage - a.scorePercentage;
        case "date":
        default:
          return b.timestamp - a.timestamp;
      }
    });

    return sorted;
  }, [history, searchTerm, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (history.length === 0) return null;

    const totalQuizzes = history.length;
    const totalScore = history.reduce((sum, item) => sum + item.score, 0);
    const totalQuestions = history.reduce(
      (sum, item) => sum + item.totalQuestions,
      0
    );
    const averageScore = Math.round(totalScore / totalQuizzes);
    const averagePercentage = Math.round(
      history.reduce((sum, item) => sum + item.scorePercentage, 0) /
        totalQuizzes
    );
    const bestScore = Math.max(...history.map((item) => item.score));
    const bestPercentage = Math.max(
      ...history.map((item) => item.scorePercentage)
    );
    const perfectScores = history.filter(
      (item) => item.scorePercentage === 100
    ).length;

    return {
      totalQuizzes,
      totalScore,
      totalQuestions,
      averageScore,
      averagePercentage,
      bestScore,
      bestPercentage,
      perfectScores,
    };
  }, [history]);

  // Clear all history
  const clearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all quiz history? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("quizHistory");
      setHistory([]);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Quiz History Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Complete your first quiz to see your results here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600">
              {stats.totalQuizzes}
            </div>
            <div className="text-sm text-gray-600">Total Quizzes</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.averagePercentage}%
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.bestPercentage}%
            </div>
            <div className="text-sm text-gray-600">Best Score</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.perfectScores}
            </div>
            <div className="text-sm text-gray-600">Perfect Scores</div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1">
            <SearchBar
              onSearch={setSearchTerm}
              placeholder="Search quiz results..."
            />
          </div>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
              <option value="percentage">Sort by Percentage</option>
            </select>

            <button onClick={clearHistory} className="btn-secondary">
              Clear History
            </button>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Quiz Results ({filteredAndSortedHistory.length})
        </h3>

        {filteredAndSortedHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No results match your search criteria.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedHistory.map((item, index) => (
              <div
                key={item.timestamp}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {item.scorePercentage >= 90
                      ? "🎉"
                      : item.scorePercentage >= 80
                      ? "🎊"
                      : item.scorePercentage >= 70
                      ? "👏"
                      : item.scorePercentage >= 60
                      ? "👍"
                      : item.scorePercentage >= 50
                      ? "😊"
                      : "💪"}
                  </div>

                  <div>
                    <div className="font-medium text-gray-900">
                      {item.score}/{item.totalQuestions} ({item.scorePercentage}
                      %)
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      item.scorePercentage >= 90
                        ? "text-green-600"
                        : item.scorePercentage >= 80
                        ? "text-green-500"
                        : item.scorePercentage >= 70
                        ? "text-blue-600"
                        : item.scorePercentage >= 60
                        ? "text-yellow-600"
                        : item.scorePercentage >= 50
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.scorePercentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHistory;
