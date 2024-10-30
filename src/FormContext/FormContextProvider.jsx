import React, { createContext, useState } from "react";
import * as XLSX from 'xlsx';

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

  //updated for excel
  const createWorksheet = (data, sheetName,) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    return workbook;
  };
 
  const exportDataToExcel = () => {
    console.log('Exporting data:', surveyData, allPremisesData, allBuildingData, allBasementsData, allToiletData); //current data
    // const workbook = createWorksheet(surveyData, 'Survey');
    const workbook = XLSX.utils.book_new();
    
    // const heading = "SURVEY INFORMATION";
    const surveyWorksheet =  XLSX.utils.json_to_sheet(surveyData);
    // surveyWorksheet['A2'] = { 
    //   v: heading, 
    //   s: { 
    //     fill: { 
    //       fgColor: { rgb: "#c7d10f" }       
    //     },
    //     font: { 
    //       bold: true, 
    //       sz: 20, 
    //       color: { rgb: "FFFFFF" } 
    //     }
    //   } 
    // }; 
    // XLSX.utils.sheet_add_json(surveyWorksheet, surveyData, [['surveyData']],{ origin: "A4" });
     XLSX.utils.sheet_add_aoa(surveyWorksheet, [["SURVEY INFORMATION"]], { origin: "A6" }); 

      // Add the survey data 
  // XLSX.utils.sheet_add_json(surveyWorksheet, surveyData , {  origin: "A2" });

  // Append the survey worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, surveyWorksheet, 'Survey' , {origin: "A3"});


    if (allPremisesData.length > 0) {
      const premisesWorksheet = XLSX.utils.json_to_sheet(allPremisesData);
      XLSX.utils.book_append_sheet(workbook, premisesWorksheet, 'Primises');
    }

    if (allBuildingData.length > 0) {
      const buildingsWorksheet = XLSX.utils.json_to_sheet(allBuildingData);
      XLSX.utils.book_append_sheet(workbook, buildingsWorksheet, 'Buildings');
    }

    if (allBasementsData.length > 0) {
      const basementsWorksheet = XLSX.utils.json_to_sheet(allBasementsData);
      XLSX.utils.book_append_sheet(workbook, basementsWorksheet, 'Basements');
    }

    if (allToiletData.length > 0) {
      const toiletsWorksheet = XLSX.utils.json_to_sheet(allToiletData);
      XLSX.utils.book_append_sheet(workbook, toiletsWorksheet, 'Toilets');
    }

    // save the workbook
    XLSX.writeFile(workbook, 'ExportedData.xlsx');
  };

  //updated for excel

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
        exportDataToExcel, //export fun (updated for excel)
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
