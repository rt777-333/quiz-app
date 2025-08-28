import { useState, useEffect, useCallback } from "react";
import { getQuestions, decodeHtml, shuffleArray } from "../api/triviaApi";

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gameState, setGameState] = useState("settings"); // 'settings', 'playing', 'finished'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Get shuffled answers for current question
  const getShuffledAnswers = useCallback(() => {
    if (!currentQuestion) return [];

    const allAnswers = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ];

    return shuffleArray(allAnswers);
  }, [currentQuestion]);

  // Start quiz with given settings
  const startQuiz = useCallback(async (settings) => {
    setLoading(true);
    setError(null);

    try {
      const fetchedQuestions = await getQuestions(settings);

      if (fetchedQuestions.length === 0) {
        throw new Error("No questions available for the selected criteria.");
      }

      // Process questions to decode HTML entities
      const processedQuestions = fetchedQuestions.map((q) => ({
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((answer) =>
          decodeHtml(answer)
        ),
      }));

      setQuestions(processedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setGameState("playing");
      setSelectedAnswer(null);
      setAnswered(false);
    } catch (err) {
      setError(err.message);
      setGameState("settings");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle answer selection
  const selectAnswer = useCallback(
    (answer) => {
      if (answered) return;

      setSelectedAnswer(answer);
      setAnswered(true);

      // Check if answer is correct
      if (answer === currentQuestion.correct_answer) {
        setScore((prev) => prev + 1);
      }
    },
    [answered, currentQuestion]
  );

  // Move to next question
  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      setGameState("finished");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }, [isLastQuestion]);

  // Reset quiz to settings
  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState("settings");
    setSelectedAnswer(null);
    setAnswered(false);
    setError(null);
  }, []);

  // Get current question data
  const getCurrentQuestionData = useCallback(() => {
    if (!currentQuestion) return null;

    return {
      question: currentQuestion.question,
      answers: getShuffledAnswers(),
      category: currentQuestion.category,
      difficulty: currentQuestion.difficulty,
    };
  }, [currentQuestion, getShuffledAnswers]);

  // Check if selected answer is correct
  const isAnswerCorrect = useCallback(
    (answer) => {
      return answer === currentQuestion?.correct_answer;
    },
    [currentQuestion]
  );

  // Get score percentage
  const getScorePercentage = useCallback(() => {
    if (totalQuestions === 0) return 0;
    return Math.round((score / totalQuestions) * 100);
  }, [score, totalQuestions]);

  // Get performance message based on score
  const getPerformanceMessage = useCallback(() => {
    const percentage = getScorePercentage();

    if (percentage >= 90) return "Excellent! You're a trivia master!";
    if (percentage >= 80) return "Great job! You really know your stuff!";
    if (percentage >= 70) return "Good work! You have solid knowledge!";
    if (percentage >= 60) return "Not bad! Keep learning and improving!";
    if (percentage >= 50) return "You're on the right track!";
    return "Keep practicing! You'll get better with time!";
  }, [getScorePercentage]);

  return {
    // State
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

    // Computed values
    currentQuestion: getCurrentQuestionData(),
    scorePercentage: getScorePercentage(),
    performanceMessage: getPerformanceMessage(),

    // Actions
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    isAnswerCorrect,
  };
};
