import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Quiz Master
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Test your knowledge with thousands of trivia questions from various
            categories. Challenge yourself, track your progress, and become a
            quiz champion!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz-settings" className="btn-primary text-lg px-8 py-4">
              Start Quiz
            </Link>
            <Link to="/history" className="btn-secondary text-lg px-8 py-4">
              View History
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Customizable Quizzes
            </h3>
            <p className="text-gray-600">
              Choose from various categories, difficulty levels, and question
              counts to tailor your experience.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600">
              Monitor your performance over time with detailed statistics and
              quiz history.
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Open Trivia Database
            </h3>
            <p className="text-gray-600">
              Access thousands of verified questions from the Open Trivia
              Database API.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-card p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quiz Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-green-600">24+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-gray-600">Difficulty Levels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">5-30</div>
              <div className="text-gray-600">Questions per Quiz</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">∞</div>
              <div className="text-gray-600">Questions Available</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of quiz enthusiasts and start your trivia journey
            today!
          </p>
          <Link to="/quiz-settings" className="btn-primary text-xl px-10 py-4">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
