import React, { createContext, useState } from "react";

export const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const [surveyData,setSurveData]=useState([]);
  const [allPremisesData, setAllPremiseData] = useState([]);
  const [numOfPremises, setNumOfPremises] = useState(0);
  const [currentPremisesIndex, setCurrentPremisesIndex] = useState(1);
  const [allBuildingData, setAllBuildingData] = useState([]);
  const [buildingcount, setBuildingCount] = useState(0);
  const [currentBuildingIndex, setCurrentBuilidingIndex] = useState(1);
  const [allBasementsData, setAllBasementsData] = useState([]);
    const [floornBasementCount, setFloornBasementCount] = useState({basement:0, floor:0});
  const [currentBaseMentIndex, setCurrentBaseMEntIndex] = useState(1);
  const [allToiletData,setAllToiletData]=useState([]);
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
        floornBasementCount,
        setFloornBasementCount,
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
