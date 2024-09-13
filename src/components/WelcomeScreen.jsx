import React from 'react';
import { FaPlayCircle } from 'react-icons/fa'; // Import icon

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <h1 className="welcome-title">Welcome to Our Survey!</h1>
      <p className="welcome-description">We value your feedback and appreciate your time.</p>
      <button onClick={onStart} className="button-start">
        <FaPlayCircle className="button-icon" /> Start Survey
      </button>
    </div>
  );
};

export default WelcomeScreen;
