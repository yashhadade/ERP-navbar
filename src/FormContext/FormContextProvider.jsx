import React, { createContext, useState } from "react";

export const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const [allPremisesData, setAllPremiseData] = useState([]);
  const [allBuildingData, setAllBuildingData] = useState([]);
  const [allToiletData,setAllToiletData]=useState([]);
  const [surveyData,setSurveData]=useState([]);
  const [numOfPremises, setNumOfPremises] = useState(0);
  const [currentPremisesIndex, setCurrentPremisesIndex] = useState(1);
  const [buildingcount, setBuildingCount] = useState(0);
  const [currentBuildingIndex, setCurrentBuilidingIndex] = useState(1);
  const [allBasementsData, setAllBasementsData] = useState([]);
  const [basmentCount, setBaseMentCount] = useState(0);
  const [currentBaseMentIndex, setCurrentBaseMEntIndex] = useState(1);
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
        buildingcount,
        setBuildingCount,
        currentBuildingIndex,
        setCurrentBuilidingIndex,
        allBasementsData,
        setAllBasementsData,
        basmentCount,
        setBaseMentCount,
        currentBaseMentIndex,
        setCurrentBaseMEntIndex,
        allToiletData,
        setAllToiletData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
