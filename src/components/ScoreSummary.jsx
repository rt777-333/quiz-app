import { useEffect } from "react";

const ScoreSummary = ({
  score,
  totalQuestions,
  scorePercentage,
  performanceMessage,
  onRetry,
  onBackToSettings,
  onSaveToHistory,
}) => {
  // Save quiz result to localStorage when component mounts
  useEffect(() => {
    const saveQuizResult = () => {
      try {
        const quizResult = {
          score,
          totalQuestions,
          scorePercentage,
          date: new Date().toISOString(),
          timestamp: Date.now(),
        };

        // Get existing history or initialize empty array
        const existingHistory = JSON.parse(
          localStorage.getItem("quizHistory") || "[]"
        );

        // Add new result
        const updatedHistory = [...existingHistory, quizResult];

        // Keep only last 50 results to prevent localStorage from getting too large
        if (updatedHistory.length > 50) {
          updatedHistory.splice(0, updatedHistory.length - 50);
        }

        localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));

        // Call the callback if provided
        if (onSaveToHistory) {
          onSaveToHistory(quizResult);
        }
      } catch (error) {
        console.error("Failed to save quiz result:", error);
      }
    };

    saveQuizResult();
  }, [score, totalQuestions, scorePercentage, onSaveToHistory]);

  const getScoreColor = () => {
    if (scorePercentage >= 90) return "text-green-600";
    if (scorePercentage >= 80) return "text-green-500";
    if (scorePercentage >= 70) return "text-blue-600";
    if (scorePercentage >= 60) return "text-yellow-600";
    if (scorePercentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreEmoji = () => {
    if (scorePercentage >= 90) return "🎉";
    if (scorePercentage >= 80) return "🎊";
    if (scorePercentage >= 70) return "👏";
    if (scorePercentage >= 60) return "👍";
    if (scorePercentage >= 50) return "😊";
    return "💪";
  };

  const getScoreMessage = (score, totalQuestions) => {
    if (scorePercentage >= 90) return "Excellent! You nailed it! 🎉";
    if (scorePercentage >= 80) return "Great job! You did well! 🎊";
    if (scorePercentage >= 70) return "Well done! You passed! 👏";
    if (scorePercentage >= 60) return "Good effort! You did your best! 👍";
    if (scorePercentage >= 50) return "Not bad! You did okay! 😊";
    return "Keep practicing! You can do better! 💪";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card text-center">
        {/* Score Display */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <span className="text-6xl font-bold text-primary-600">{score}</span>
            <span className="text-gray-400 text-4xl">/{totalQuestions}</span>
          </div>
        </div>

        {/* Score Message */}
        <p className="text-lg text-gray-600 mb-6">
          {getScoreMessage(score, totalQuestions)}
        </p>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{score}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {totalQuestions - score}
            </div>
            <div className="text-sm text-gray-600">Incorrect Answers</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button onClick={onRetry} className="btn-primary w-full text-lg py-3">
            Try Again
          </button>

          <button
            onClick={onBackToSettings}
            className="btn-secondary w-full text-lg py-3"
          >
            New Quiz Settings
          </button>
        </div>

        {/* Share Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Share your results:</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                const text = `I scored ${score}/${totalQuestions} (${scorePercentage}%) on the Quiz App! 🎯`;
                if (navigator.share) {
                  navigator.share({ text });
                } else {
                  navigator.clipboard.writeText(text);
                  // You could add a toast notification here
                }
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Share results"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreSummary;
