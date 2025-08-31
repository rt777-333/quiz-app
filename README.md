# Quiz Master - React Quiz Application

A modern, responsive quiz application built with React, Vite, and Tailwind CSS, powered by the Open Trivia Database API.

## 🚀 Features

### Core Functionality
- **Customizable Quizzes**: Choose from 24+ categories, 3 difficulty levels, and 5-30 questions
- **Real-time Scoring**: Track your score as you progress through questions
- **Progress Tracking**: Visual progress bar and question counter
- **Quiz History**: Save and review all your quiz attempts with detailed statistics
- **Performance Analytics**: View average scores, best performances, and improvement trends

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations and transitions
- **Accessibility**: ARIA labels, keyboard navigation, and focus management
- **Error Handling**: Graceful error handling for API failures and network issues

### Technical Features
- **Open Trivia Database**: Access to thousands of verified trivia questions
- **Local Storage**: Persistent quiz history and user preferences
- **Search & Filter**: Find categories quickly with intelligent search
- **State Management**: Efficient state management with custom React hooks

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **API**: Open Trivia Database (opentdb.com)
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Build Tool**: Vite for fast development and optimized builds

## 📱 Screenshots

### Quiz Settings Screen
- Logo and navigation at the top
- Centered card with "Customize Your Quiz" title
- Dropdown for number of questions (5-30)
- Difficulty buttons (Easy, Medium, Hard, Any)
- Category dropdown with search functionality
- Green "Start Quiz" button
- Footer with links and social icons

### Quiz Question Screen
- Question counter and score display
- Clear question text
- Multiple-choice answer buttons (A, B, C, D)
- Visual feedback for correct/incorrect answers
- Progress bar at the bottom
- Green "Next Question" button

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Footer with links
│   ├── QuizStart.jsx   # Quiz settings form
│   ├── QuestionCard.jsx # Individual question display
│   ├── ScoreSummary.jsx # Quiz results and statistics
│   ├── QuizHistory.jsx # Quiz history and analytics
│   └── SearchBar.jsx   # Search functionality
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Quiz.jsx        # Main quiz interface
│   ├── QuizSettings.jsx # Quiz configuration
│   └── History.jsx     # Quiz history page
├── hooks/              # Custom React hooks
│   └── useQuiz.js      # Quiz state management
├── api/                # API services
│   └── triviaApi.js    # Open Trivia Database integration
├── App.jsx             # Main app component with routing
└── main.jsx            # App entry point
```

## 🎯 Usage Guide

### Starting a Quiz
1. Navigate to "Quiz Settings" from the navigation menu
2. Select your preferred number of questions (5-30)
3. Choose difficulty level (Easy, Medium, Hard, or Any)
4. Select a category or leave as "Any Category"
5. Click "Start Quiz" to begin

### During the Quiz
1. Read each question carefully
2. Click on your chosen answer (A, B, C, or D)
3. Review the correct answer and your score
4. Click "Next Question" to continue
5. Complete all questions to see your final results

### Reviewing Results
1. View your final score and percentage
2. See performance statistics and feedback
3. Choose to retry with same settings or start a new quiz
4. Share your results with friends

### Accessing History
1. Navigate to "History" from the navigation menu
2. View comprehensive statistics and performance trends
3. Search and filter your quiz results
4. Sort by date, score, or percentage

## 🔧 Configuration

### Tailwind CSS
The app uses a custom Tailwind configuration with:
- Extended color palette (primary, secondary)
- Custom shadows and spacing
- Responsive breakpoints
- Custom component classes

### API Configuration
- Base URL: `https://opentdb.com/api.php`
- Categories: `https://opentdb.com/api_category.php`
- Rate limiting: Built-in error handling for API responses

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Vercel
1. Import your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy with automatic previews

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build and preview
npm run build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the quiz questions
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support

If you have any questions or need help:
- Check the documentation
- Review the code comments

---

**Happy Quizzing! 🎉**
