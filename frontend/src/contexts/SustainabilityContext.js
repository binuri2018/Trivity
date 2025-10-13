import React, { createContext, useContext, useState, useEffect } from 'react';

const SustainabilityContext = createContext();

export const useSustainability = () => {
  const context = useContext(SustainabilityContext);
  if (!context) {
    throw new Error('useSustainability must be used within a SustainabilityProvider');
  }
  return context;
};

export const SustainabilityProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({
    overall: 0,
    environmental: 0,
    social: 0,
    governance: 0,
    general: 0
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem('sustainabilityAnswers');
    const savedScores = localStorage.getItem('sustainabilityScores');
    const savedSubmitted = localStorage.getItem('sustainabilitySubmitted');
    
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
    if (savedSubmitted) {
      setIsSubmitted(JSON.parse(savedSubmitted));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('sustainabilityAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('sustainabilityScores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('sustainabilitySubmitted', JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  const calculateScores = (answers) => {
    const questions = {
      General: [
        "Is Sustainability important in your company",
        "Does your company have a team to look at the Sustainability aspects of the business",
        "Do you think Sustainability is crucial for every company",
        "Does your have a clear understanding of what ESG means in Sustainability"
      ],
      Environment: [
        "IS your company aware of its carbon footprint",
        "Are there steps planned to reduce the carbon footprint of the company?",
        "Is your company aware of its energy usage?",
        "Is your company aware of its impact on air and water quality?",
        "Are you aware of the natural resources used by your company?"
      ],
      Social: [
        "Does your company have an equal employment opportunities for both genders?",
        "Are you satisfied with the company's culture?",
        "Is your company aware on the important of mental wellbeing?",
        "Are you satisfied with the company's working environment?",
        "Does your company provided equal career advancement opportunities to its employees?",
        "Do you feel safe working in your company?",
        "Are the company policies fair to the employees?",
        "Does your company's policies keep up with the times?(e.g. how your company support employees in response to the pandemic)",
        "Can you trust the management to handle difficult situations fairly?(e.g. sexual harassment, bullying, discrimination)"
      ],
      Governance: [
        "Does your company have a balance of board composition? (Gender, representative)",
        "Is the management team aware about importance of corporate culture within the company?",
        "Is your management aware of any unethical behavior on the ground?",
        "Does your company have a board of directors to hold the CEO accountable?",
        "Does your company have any PDPA policies?",
        "Does your company have a team to manage data and its protection?",
        "Does your company priorities diversity and inclusivity?",
        "Can you trust the management to make ethical decisions?",
        "Are there processes in place to prevent corruption and bribery of the company's people and resources?"
      ]
    };

    const calculateCategoryScore = (categoryQuestions) => {
      const categoryAnswers = categoryQuestions.filter(q => answers[q] === 'Yes');
      return Math.round((categoryAnswers.length / categoryQuestions.length) * 100);
    };

    const generalScore = calculateCategoryScore(questions.General);
    const environmentalScore = calculateCategoryScore(questions.Environment);
    const socialScore = calculateCategoryScore(questions.Social);
    const governanceScore = calculateCategoryScore(questions.Governance);

    const overallScore = Math.round((generalScore + environmentalScore + socialScore + governanceScore) / 4);

    return {
      overall: overallScore,
      general: generalScore,
      environmental: environmentalScore,
      social: socialScore,
      governance: governanceScore
    };
  };

  const updateAnswer = (question, answer) => {
    const newAnswers = { ...answers, [question]: answer };
    setAnswers(newAnswers);
    
    // Recalculate scores
    const newScores = calculateScores(newAnswers);
    setScores(newScores);
  };

  const submitAnswers = () => {
    setIsSubmitted(true);
    const finalScores = calculateScores(answers);
    setScores(finalScores);
  };

  const resetAnswers = () => {
    setAnswers({});
    setScores({
      overall: 0,
      environmental: 0,
      social: 0,
      governance: 0,
      general: 0
    });
    setIsSubmitted(false);
  };

  const value = {
    answers,
    scores,
    isSubmitted,
    updateAnswer,
    submitAnswers,
    resetAnswers
  };

  return (
    <SustainabilityContext.Provider value={value}>
      {children}
    </SustainabilityContext.Provider>
  );
};
