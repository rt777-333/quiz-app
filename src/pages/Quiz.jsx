import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import QuizStart from "../components/QuizStart";
import QuestionCard from "../components/QuestionCard";
import ScoreSummary from "../components/ScoreSummary";

const Quiz = () => {
  const location = useLocation();
  const settings = location.state?.settings;

  const {
    questions,
    currentQuestionIndex,
    score,
    loading,
    error,
    gameState,
    selectedAnswer,
    answered,
    totalQuestions,
    isLastQuestion,
    currentQuestion,
    scorePercentage,
    performanceMessage,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    isAnswerCorrect,
  } = useQuiz();

  // Auto-start quiz if settings are provided
  useEffect(() => {
    if (settings && gameState === "settings") {
      startQuiz(settings);
    }
  }, [settings, gameState, startQuiz]);

  // Handle quiz start
  const handleStartQuiz = async (quizSettings) => {
    await startQuiz(quizSettings);
  };

  // Handle answer selection
  const handleSelectAnswer = (answer) => {
    selectAnswer(answer);
  };

  // Handle next question
  const handleNextQuestion = () => {
    nextQuestion();
  };

  // Handle retry with same settings
  const handleRetry = () => {
    if (settings) {
      startQuiz(settings);
    } else {
      resetQuiz();
    }
  };

  // Handle back to settings
  const handleBackToSettings = () => {
    resetQuiz();
  };

  // Render loading state
  if (loading && gameState === "settings") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && gameState === "settings") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L13.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-lg font-medium">Something went wrong</p>
            <p className="text-gray-600 mt-2">{error}</p>
          </div>
          <button onClick={resetQuiz} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render quiz settings (if no settings provided)
  if (gameState === "settings" && !settings) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <QuizStart onStartQuiz={handleStartQuiz} loading={loading} />
      </div>
    );
  }

  // Render quiz question
  if (gameState === "playing" && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <QuestionCard
          question={currentQuestion}
          answers={currentQuestion.answers}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          score={score}
          selectedAnswer={selectedAnswer}
          answered={answered}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={isLastQuestion}
        />
      </div>
    );
  }

  // Render score summary
  if (gameState === "finished") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <ScoreSummary
          score={score}
          totalQuestions={totalQuestions}
          scorePercentage={scorePercentage}
          performanceMessage={performanceMessage}
          onRetry={handleRetry}
          onBackToSettings={handleBackToSettings}
        />
      </div>
    );
  }

  // Fallback - should not reach here
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-gray-600">
          Something went wrong. Please refresh the page.
        </p>
      </div>
    </div>
  );
};

export default Quiz;
