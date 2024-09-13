import React, { useState } from 'react';

const QuestionCard = ({ question, onAnswer }) => {
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = () => {
    onAnswer(response);
  };

  return (
    <div className="question-card">
      <h2>{question.text}</h2>
      {question.type === 'rating' && (
        <div className="options">
          {question.options.map(option => (
            <label key={option} className="option-circle">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={handleChange}
                checked={response === option.toString()}
                className="option-input"
              />
              <span className="option-number">{option}</span>
            </label>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <textarea value={response} onChange={handleChange} />
      )}
    </div>
  );
};

export default QuestionCard;
