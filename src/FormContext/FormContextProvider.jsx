import React, { createContext, useState } from "react";

export const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const [allPremisesData, setAllPremiseData] = useState([]);
  const [allBuildingData, setAllBuildingData] = useState([]);
  const [allToiletData,setAllToiletData]=useState([]);
  const [surveyData,setSurveData]=useState([]);
  const [numOfPremises, setNumOfPremises] = useState(0);
  const [currentPremisesIndex, setCurrentPremisesIndex] = useState(1);
  console.log(allBuildingData);
  
  return (
    <FormContext.Provider
      value={{
        surveyData,
        setSurveData,
        allPremisesData,
        setAllPremiseData,
        numOfPremises,
        setNumOfPremises,
        currentPremisesIndex,
        setCurrentPremisesIndex,
        allBuildingData,
        setAllBuildingData,
        allToiletData,
        setAllToiletData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
