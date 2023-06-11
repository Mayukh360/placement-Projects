import React, { useState } from 'react';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: 'What is the capital of France?',
      options: [
        'Paris',
        'London',
        'Berlin',
        'Madrid'
      ],
      correctAnswer: 'Paris'
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: [
        'Mars',
        'Jupiter',
        'Saturn',
        'Earth'
      ],
      correctAnswer: 'Jupiter'
    },
    // Add more questions here...
  ];

  const handleAnswerOptionClick = (answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <h3>{questions[currentQuestion].question}</h3>
          <div className="answer-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)}>{option}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
