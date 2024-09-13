// src/components/ThankYouScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegSmile } from 'react-icons/fa'; 

const ThankYouScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to welcome screen
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thank-you-screen">
      <h1>Thank you for your time! <FaRegSmile style={{ marginLeft: '10px', color: '#28a745' }} /></h1>
    </div>
  );
};

export default ThankYouScreen;
