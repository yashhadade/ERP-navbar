import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FormContext } from "../FormContext/FormContextProvider";

const Buildings = ({ onPrevious, onNext }) => {
  const {
    setAllBuildingData,
    allBuildingData,
    numOfPremises,
    currentPremisesIndex,
    setCurrentPremisesIndex,
    buildingcount,
    currentBuildingIndex,
    setCurrentBuilidingIndex,floornBasementCount, setFloornBasementCount
  } = useContext(FormContext);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const location = useLocation();
  // const [] = useState({});

  const [buildingData, setBuildingData] = useState({
    buildingName: "",
    carpetArea: 0,
    builtUpArea: 0,
    numEmployees: 0,
    numWorkstations: 0,
    numElevations: 0,
    numEscalators: 0,
    numStaircases: 0,
    facadeType: "--Select--",
    facadeSqft: 0,
    compoundSqft: 0,
    compoundFlooring: 0,
    gradedBuilding: "--Select--",
    classOfBuilding: "--Select--",
    ageOfBuilding: "",
    compound: 0,
    basement: 0,
    stiltPark: 0,
    floors: 0,
    terrace: 0,
    numParking: 0,
    numTwoWheelers: 0,
    parkingManagement: "--Select--",
    parkingMode: "--Select--",
    securitySystem: "--Select--",
    fireSafety: "--Select--",
    energyConservation: "--Select--",
    waterConservation: "--Select",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuildingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) e.stopPropagation();
    setValidated(true);
  };
console.log(buildingData);

  const handleNextForm = async () => {
    await setAllBuildingData((prev) => {
      const newData = [...prev]; // Create a copy of the previous state
      newData[currentBuildingIndex - 1] = buildingData; // Update the specific index
      return newData; // Return the updated array
    });

    
    if (buildingData?.basement > 0 || buildingData?.floors > 0) {

      setFloornBasementCount({basement:buildingData?.basement, floor:buildingData?.floors})

      navigate("/basement");
    } else if (currentBuildingIndex < buildingcount) {
      setCurrentBuilidingIndex(currentBuildingIndex + 1);
      setBuildingData(allBuildingData[currentBuildingIndex] || {}); // Load data for the next building if it exists
    } else if (numOfPremises > currentPremisesIndex) {
      setCurrentPremisesIndex(currentPremisesIndex + 1);
      navigate("/premises");
    } else {
      alert("Premises form done")
    }
  };

  console.log(floornBasementCount);
  
  useEffect(()=>{
    console.log(allBuildingData);
    
if(allBuildingData.length > 0){
  console.log("here",currentBuildingIndex , currentBuildingIndex-2);
  setBuildingData(allBuildingData[currentBuildingIndex - 1] || {});
}
  },[])

  const hanldePreviousForm = () => {
    console.log(currentBuildingIndex);
    
    if (currentBuildingIndex > 1) {
      setCurrentBuilidingIndex((prev)=>prev - 1);
      setBuildingData(allBuildingData[currentBuildingIndex - 2] || {}); // load data for the previous building if it exists
    }
    else if ( currentBuildingIndex === 1) {
      console.log(true);
      
      navigate("/premises");
    //  if (!allBuildingData.length){
    //   navigate("/premises");

     
    } 
  }; 

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h1 className="form-title">
        Building {currentBuildingIndex} Form for Premises{" "}
        {currentPremisesIndex}
      </h1>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="buildingName">
          <Form.Label>Name of Building</Form.Label>
          <Form.Control
            requiredd
            type="text"
            name="buildingName"
            value={buildingData?.buildingName || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="carpetArea">
          <Form.Label>Carpet Area (sq. ft)</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="carpetArea"
            value={buildingData?.carpetArea || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="builtUpArea">
          <Form.Label>Built-Up Area (sq. ft)</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="builtUpArea"
            value={buildingData?.builtUpArea || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="numEmployees">
          <Form.Label>Number of Employees</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="numEmployees"
            value={buildingData?.numEmployees || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="numWorkstations">
          <Form.Label>Number of Workstations</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="numWorkstations"
            value={buildingData?.numWorkstations || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="numElevations">
          <Form.Label>Number of Elevations</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="numElevations"
            value={buildingData?.numElevations || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="numEscalators">
          <Form.Label>Number of Escalators</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="numEscalators"
            value={buildingData?.numEscalators || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="numStaircases">
          <Form.Label>Number of Staircases</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="numStaircases"
            value={buildingData?.numStaircases || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="facadeType">
          <Form.Label>Facade Type</Form.Label>
          <Form.Control
            as="select"
            name="facadeType"
            value={buildingData?.facadeType || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="f1">F1</option>
            <option value="f2">F2</option>
            <option value="f3">F3</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="facadeSqft">
          <Form.Label>Facade Sqft</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="facadeSqft"
            value={buildingData?.facadeSqft || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="compoundSqft">
          <Form.Label>Compound Sqft</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="compoundSqft"
            value={buildingData?.compoundSqft || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="compoundFlooring">
          <Form.Label>Compound Flooring</Form.Label>
          <Form.Control
            as="select"
            name="compoundFlooring"
            value={buildingData?.compoundFlooring || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="cf1">CF1</option>
            <option value="cf2">CF2</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="gradedBuilding">
          <Form.Label>Graded Building</Form.Label>
          <Form.Control
            as="select"
            name="gradedBuilding"
            value={buildingData?.gradedBuilding || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="classOfBuilding">
          <Form.Label>Class of Building</Form.Label>
          <Form.Control
            as="select"
            name="classOfBuilding"
            value={buildingData?.classOfBuilding || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="heritage">Heritage</option>
            <option value="new">New</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="ageOfBuilding">
          <Form.Label>Age of Building (years)</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="ageOfBuilding"
            value={buildingData?.ageOfBuilding || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>
      {/* building layout ---will add---- */}
      <h2>Building Layout</h2>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="compound">
          <Form.Label>Compound</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="compound"
            value={buildingData?.compound || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="basement">
          <Form.Label>Basement</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="basement"
            value={buildingData?.basement || ""}
            onChange={handleInputChange}
            placeholder="Basement"
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="stiltPark">
          <Form.Label>Stilt Parking</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="stiltPark"
            value={buildingData?.stiltPark || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="floors">
          <Form.Label>Floors</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="floors"
            value={buildingData?.floors || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="terrace">
          <Form.Label>Top Floor Terrace</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="terrace"
            value={buildingData?.terrace || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="numParking">
          <Form.Label>No. of Parking</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="numParking"
            value={buildingData?.numParking || ""}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="numTwoWheelers">
          <Form.Label>No. of Two Wheelers</Form.Label>
          <Form.Control
            requiredd
            type="number"
            name="numTwoWheelers"
            value={buildingData?.numTwoWheelers || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="parkingManagement">
          <Form.Label>Parking Management System</Form.Label>
          <Form.Control
            as="select"
            name="parkingManagement"
            value={buildingData?.parkingManagement || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="automated">Automated</option>
            <option value="manual">Manual</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="parkingMode">
          <Form.Label>Parking Mode</Form.Label>
          <Form.Control
            as="select"
            name="parkingMode"
            value={buildingData?.parkingMode || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="dedicated">Dedicated</option>
            <option value="nonDedicated">Non-Dedicated</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="securitySystem">
          <Form.Label>Security System</Form.Label>
          <Form.Control
            as="select"
            name="securitySystem"
            value={buildingData?.securitySystem || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="cctv">CCTV</option>
            <option value="guards">Guards</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="fireSafety">
          <Form.Label>Fire Safety System</Form.Label>
          <Form.Control
            as="select"
            name="fireSafety"
            value={buildingData?.fireSafety || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="sprinklers">Sprinklers</option>
            <option value="alarms">Alarms</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="energyConservation">
          <Form.Label>Energy Conservation System</Form.Label>
          <Form.Control
            as="select"
            name="energyConservation"
            value={buildingData?.energyConservation || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="ledLighting">LED Lighting</option>
            <option value="solar">Solar</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="waterConservation">
          <Form.Label>Water Conservation System</Form.Label>
          <Form.Control
            as="select"
            name="waterConservation"
            value={buildingData?.waterConservation || ""}
            onChange={handleInputChange}
            requiredd
          >
            <option value="">Select...</option>
            <option value="rainwaterHarvesting">Rainwater Harvesting</option>
            <option value="greyWaterReuse">Grey Water Reuse</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <div className="button-group">
        <Button variant="secondary" onClick={hanldePreviousForm}>
          Previous
        </Button>
        <Button variant="secondary" type="submit" style={{float:"right"}} className="me-3" onClick={handleNextForm}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Buildings;
