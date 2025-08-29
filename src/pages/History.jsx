import QuizHistory from "../components/QuizHistory";

const History = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz History
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your quiz performance over time. Review your scores, see your
            progress, and celebrate your achievements!
          </p>
        </div>

        {/* History Component */}
        <QuizHistory />
      </div>
    </div>
  );
};

export default History;
