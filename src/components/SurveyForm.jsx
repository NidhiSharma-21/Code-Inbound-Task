import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import ThankYouScreen from './ThankYouScreen';
import WelcomeScreen from './WelcomeScreen';
import { saveSurveyResponse, setSurveyCompleted, isSurveyCompleted } from '../localStorageService';
import { FaArrowLeft, FaArrowRight, FaForward, FaCheckCircle } from 'react-icons/fa';

const questions = [
  { id: 1, text: "How satisfied are you with our products?", type: "rating", options: [1, 2, 3, 4, 5] },
  { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", options: [1, 2, 3, 4, 5] },
  { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", options: [1, 2, 3, 4, 5] },
  { id: 4, text: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 5, text: "What could we do to improve our service?", type: "text" }
];

const SurveyForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId] = useState(Date.now().toString()); // Unique session ID
  const [completed, setCompleted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (isSurveyCompleted(sessionId)) {
      setCompleted(true);
    }
  }, [sessionId]);

  const handleAnswer = (answer) => {
    saveSurveyResponse(sessionId, questions[currentQuestionIndex].id, answer);
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the survey?')) {
      setSurveyCompleted(sessionId);
      setCompleted(true);
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleSkip = () => {
    handleAnswer(null); // Skip by saving null response
    handleNext();
  };

  const handleStartSurvey = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStartSurvey} />;
  }

  if (completed) {
    return <ThankYouScreen />;
  }

  return (
    <div className="survey-form">
      <h1 className="text-2xl font-semibold mb-4">Customer Survey</h1>
      <p className="mb-4">Question {currentQuestionIndex + 1} / {questions.length}</p>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
      <div className="navigation">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="button-prev">
          <FaArrowLeft /> Previous
        </button>
        <button onClick={handleSkip} className="button-skip">
          <FaForward /> Skip
        </button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext} className="button-next">
            Next <FaArrowRight />
          </button>
        ) : (
          <button onClick={handleSubmit} className="button-submit">
            Submit <FaCheckCircle />
          </button>
        )}
      </div>
    </div>
  );
};

export default SurveyForm;
