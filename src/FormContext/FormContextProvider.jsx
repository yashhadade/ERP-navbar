import React, { createContext, useState } from "react";

export const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const [surveyData, setSurveData] = useState([]);
  const [allPremisesData, setAllPremiseData] = useState([]);
  const [numOfPremises, setNumOfPremises] = useState(0);
  const [currentPremisesIndex, setCurrentPremisesIndex] = useState(1);
  const [allBuildingData, setAllBuildingData] = useState([]);
  const [buildingcount, setBuildingCount] = useState(0);
  const [currentBuildingIndex, setCurrentBuilidingIndex] = useState(1);
  const [allBasementsData, setAllBasementsData] = useState([]);
  const [floornBasementCount, setFloornBasementCount] = useState({
    basement: 0,
    floor: 0,
  });
  const [toiletDiverRoomCount, setToiletDiverRoomCount] = useState({
    gentsToilet: 0,
    ladiesToilet: 0,
    driverRoom: 0,
  });

  const [currentDriverRoomtIndex, setCurrentDriverRoomtIndex] = useState(1);

  const [currentBaseMentIndex, setCurrentBaseMEntIndex] = useState(1);
  const [currentFormCount, setCurrentFormCount] = useState(1);
  const [currectToiletIndex, setCurrectToiletIndex] = useState(1);
  const [allToiletData, setAllToiletData] = useState([]);

  const [allDriverRoomData, setAllDriverRoomData] = useState([]); //for all driver room data
  const [currentDriverRoomIndex, setCurrentDriverRoomIndex] = useState(1); // to track driverr. index
  const [currentFormType, setCurrentFormType] = useState("");
  const [currentToiletType, setCurrentToiletType] = useState("");
  console.log(
    "survey",
    surveyData,
    "premies",
    allPremisesData,
    "building",
    allBuildingData,
    "Basement",
    allBasementsData,
    "Toilet",
    allToiletData,
    "DriverRoom",
    allDriverRoomData
  );

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
        currentFormType,
        setCurrentFormType,
        setAllBasementsData,
        floornBasementCount,
        setFloornBasementCount,
        currentBaseMentIndex,
        setCurrentBaseMEntIndex,
        allToiletData,
        setAllToiletData,
        toiletDiverRoomCount,
        setToiletDiverRoomCount,
        currentDriverRoomtIndex,
        setCurrentDriverRoomtIndex,
        currectToiletIndex,
        setCurrectToiletIndex,
        currentFormCount,
        setCurrentFormCount,
        currentToiletType,
        setCurrentToiletType,

        allDriverRoomData, //driver room data management
        setAllDriverRoomData, //for updating driver room data
        currentDriverRoomIndex, //to track current driver room index
        setCurrentDriverRoomIndex, //to set current driver room index
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
