import React, { createContext, useContext, useState, useEffect } from 'react';

const CarbonEmissionsContext = createContext();

export const useCarbonEmissions = () => {
  const context = useContext(CarbonEmissionsContext);
  if (!context) {
    throw new Error('useCarbonEmissions must be used within a CarbonEmissionsProvider');
  }
  return context;
};

export const CarbonEmissionsProvider = ({ children }) => {
  const [carbonData, setCarbonData] = useState({
    scope1: {},
    scope2: {},
    scope3: {},
    facilityInfo: {},
    dateRange: {}
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCarbonData = localStorage.getItem('carbonEmissionsData');
    const savedSubmitted = localStorage.getItem('carbonEmissionsSubmitted');
    
    if (savedCarbonData) {
      setCarbonData(JSON.parse(savedCarbonData));
    }
    if (savedSubmitted) {
      setIsSubmitted(JSON.parse(savedSubmitted));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('carbonEmissionsData', JSON.stringify(carbonData));
  }, [carbonData]);

  useEffect(() => {
    localStorage.setItem('carbonEmissionsSubmitted', JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  const updateScopeData = (scope, data) => {
    setCarbonData(prev => ({
      ...prev,
      [scope]: { ...prev[scope], ...data }
    }));
  };

  const updateFacilityInfo = (data) => {
    setCarbonData(prev => ({
      ...prev,
      facilityInfo: { ...prev.facilityInfo, ...data }
    }));
  };

  const updateDateRange = (data) => {
    setCarbonData(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, ...data }
    }));
  };

  const submitCarbonData = () => {
    setIsSubmitted(true);
  };

  const resetCarbonData = () => {
    setCarbonData({
      scope1: {},
      scope2: {},
      scope3: {},
      facilityInfo: {},
      dateRange: {}
    });
    setIsSubmitted(false);
  };

  const hasData = () => {
    return Object.keys(carbonData.scope1).length > 0 || 
           Object.keys(carbonData.scope2).length > 0 || 
           Object.keys(carbonData.scope3).length > 0;
  };

  const value = {
    carbonData,
    isSubmitted,
    updateScopeData,
    updateFacilityInfo,
    updateDateRange,
    submitCarbonData,
    resetCarbonData,
    hasData
  };

  return (
    <CarbonEmissionsContext.Provider value={value}>
      {children}
    </CarbonEmissionsContext.Provider>
  );
};
