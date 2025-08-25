 import { useMemo } from "react";

const QuestionCard = ({
  question,
  answers,
  currentQuestionIndex,
  totalQuestions,
  score,
  selectedAnswer,
  answered,
  onSelectAnswer,
  onNextQuestion,
  isLastQuestion,
}) => {
  // Memoize shuffled answers to prevent re-shuffling on re-renders
  const shuffledAnswers = useMemo(() => {
    return [...answers].sort(() => Math.random() - 0.5);
  }, [answers]);

  const getAnswerButtonClass = (answer) => {
    if (!answered) {
      return "bg-white hover:bg-gray-50 border-gray-200 text-gray-700";
    }

    if (answer === selectedAnswer) {
      return answer === question.correct_answer
        ? "bg-green-100 border-green-500 text-green-700"
        : "bg-red-100 border-red-500 text-red-700";
    }

    if (answer === question.correct_answer) {
      return "bg-green-100 border-green-500 text-green-700";
    }

    return "bg-gray-100 border-gray-200 text-gray-500";
  };

  const getAnswerIcon = (answer) => {
    if (!answered) return null;

    if (answer === question.correct_answer) {
      return (
        <svg
          className="w-5 h-5 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (answer === selectedAnswer && answer !== question.correct_answer) {
      return (
        <svg
          className="w-5 h-5 text-red-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="quiz-card">
        {/* Header with progress and score */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            <span className="font-medium">
              Question {currentQuestionIndex + 1}
            </span>
            <span className="text-gray-400 mx-2">of</span>
            <span className="font-medium">{totalQuestions}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Score</div>
            <div className="text-2xl font-bold text-primary-600">{score}</div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-8">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(answer)}
              disabled={answered}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed ${getAnswerButtonClass(
                answer
              )}`}
              aria-label={`Answer option ${String.fromCharCode(
                65 + index
              )}: ${answer}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium text-sm mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium">{answer}</span>
                </div>
                {getAnswerIcon(answer)}
              </div>
            </button>
          ))}
        </div>

        {/* Next Question Button */}
        {answered && (
          <div className="text-center">
            <button
              onClick={onNextQuestion}
              className="btn-primary text-lg px-8 py-3"
            >
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;