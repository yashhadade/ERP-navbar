import React, { useState } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';

const Buildings = ({ currentPremisesIndex, buildingData, setBuildingData, onPrevious, onNext }) => {
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuildingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setBuildingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) e.stopPropagation();
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h1 className="form-title">Building Form for Premises {currentPremisesIndex + 1}</h1>
      
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="buildingName">
          <Form.Label>Name of Building</Form.Label>
          <Form.Control 
            required 
            type="text" 
            name="buildingName" 
            value={buildingData.buildingName || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="carpetArea">
          <Form.Label>Carpet Area (sq. ft)</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="carpetArea" 
            value={buildingData.carpetArea || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="builtUpArea">
          <Form.Label>Built-Up Area (sq. ft)</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="builtUpArea" 
            value={buildingData.builtUpArea || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="numEmployees">
          <Form.Label>Number of Employees</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="numEmployees" 
            value={buildingData.numEmployees || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="numWorkstations">
          <Form.Label>Number of Workstations</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="numWorkstations" 
            value={buildingData.numWorkstations || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="numElevations">
          <Form.Label>Number of Elevations</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="numElevations" 
            value={buildingData.numElevations || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="numEscalators">
          <Form.Label>Number of Escalators</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="numEscalators" 
            value={buildingData.numEscalators || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="numStaircases">
          <Form.Label>Number of Staircases</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="numStaircases" 
            value={buildingData.numStaircases || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="facadeType">
          <Form.Label>Facade Type</Form.Label>
          <Form.Control 
            as="select" 
            name="facadeType" 
            value={buildingData.facadeType || ''} 
            onChange={handleInputChange} 
            required
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
            required 
            type="number" 
            name="facadeSqft" 
            value={buildingData.facadeSqft || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="compoundSqft">
          <Form.Label>Compound Sqft</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="compoundSqft" 
            value={buildingData.compoundSqft || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="compoundFlooring">
          <Form.Label>Compound Flooring</Form.Label>
          <Form.Control 
            as="select" 
            name="compoundFlooring" 
            value={buildingData.compoundFlooring || ''} 
            onChange={handleInputChange} 
            required
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
            value={buildingData.gradedBuilding || ''} 
            onChange={handleInputChange} 
            required
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
            value={buildingData.classOfBuilding || ''} 
            onChange={handleInputChange} 
            required
          >
            <option value="">Select...</option>
            <option value="heritage">Heritage</option>
            <option value="new">New</option>
          </Form.Control>
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="ageOfBuilding">
          <Form.Label>Age of Building (years)</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="ageOfBuilding" 
            value={buildingData.ageOfBuilding || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="buildingLayout">
          <Form.Label>Building Layout</Form.Label>
          <Form.Control 
            required 
            type="text" 
            name="buildingLayout" 
            value={buildingData.buildingLayout || ''} 
            onChange={handleInputChange} 
            placeholder="e.g., Basement, Stilt Parking, Floors..."
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="numParking">
          <Form.Label>No. of Parking</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="numParking" 
            value={buildingData.numParking || ''} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="numTwoWheelers">
          <Form.Label>No. of Two Wheelers</Form.Label>
          <Form.Control 
            required 
            type="number" 
            name="numTwoWheelers" 
            value={buildingData.numTwoWheelers || ''} 
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
            value={buildingData.parkingManagement || ''} 
            onChange={handleInputChange} 
            required
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
            value={buildingData.parkingMode || ''} 
            onChange={handleInputChange} 
            required
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
            value={buildingData.securitySystem || ''} 
            onChange={handleInputChange} 
            required
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
            value={buildingData.fireSafety || ''} 
            onChange={handleInputChange} 
            required
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
            value={buildingData.energyConservation || ''} 
            onChange={handleInputChange} 
            required
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
            value={buildingData.waterConservation || ''} 
            onChange={handleInputChange} 
            required
          >
            <option value="">Select...</option>
            <option value="rainwaterHarvesting">Rainwater Harvesting</option>
            <option value="greyWaterReuse">Grey Water Reuse</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <div className="button-group">
        <Button variant="secondary" onClick={onPrevious}>Previous</Button>
        <Button variant="primary" type="submit" onClick={onNext}>Next</Button>
      </div>
    </Form>
  );
};

export default Buildings;
