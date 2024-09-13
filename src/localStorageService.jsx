// src/localStorageService.js
export const saveSurveyResponse = (sessionId, questionId, answer) => {
    const responses = JSON.parse(localStorage.getItem('surveyResponses')) || {};
    responses[sessionId] = responses[sessionId] || {};
    responses[sessionId][questionId] = answer;
    localStorage.setItem('surveyResponses', JSON.stringify(responses));
  };
  
  export const getSurveyResponses = (sessionId) => {
    const responses = JSON.parse(localStorage.getItem('surveyResponses')) || {};
    return responses[sessionId] || {};
  };
  
  export const setSurveyCompleted = (sessionId) => {
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions')) || [];
    if (!completedSessions.includes(sessionId)) {
      completedSessions.push(sessionId);
      localStorage.setItem('completedSessions', JSON.stringify(completedSessions));
    }
  };
  
  export const isSurveyCompleted = (sessionId) => {
    const completedSessions = JSON.parse(localStorage.getItem('completedSessions')) || [];
    return completedSessions.includes(sessionId);
  };
  