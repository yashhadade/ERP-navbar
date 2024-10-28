import React from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';

const Building = ({ index, buildingData, setBuildingData, totalBuildings, setValidated, setPremisesData,
    currentBuildingsIndex, formData, onNext, seatBuildingData, onPrevious, numOfBuildings,
 }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuildingData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, field) => {
    setBuildingData(prev => ({
      ...prev, [field]: URL.createObjectURL(e.target.files[0])
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) e.stopPropagation();
    setValidated(true);
  
    // Save data for the current premises index
    setPremisesData(prevData => {
      const newData = [...prevData];
      newData[currentBuildingsIndex] = formData; // Save current form data
      return newData;
    });
  
    console.log("Form submitted:", formData);
    // Call the onNext function after submitting
    onNext();
  };

  return (
    <div>
     <h1 className="form-title text-center">Building Form</h1>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`buildingName-${index}`}>
          <Form.Label>Name of Building</Form.Label>
          <Form.Control
            type="text"
            name="buildingName"
            value={buildingData?.buildingName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`carpetArea-${index}`}>
          <Form.Label>Carpet Area (sq. ft)</Form.Label>
          <Form.Control
            type="number"
            name="carpetArea"
            value={buildingData?.carpetArea}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`builtUpArea-${index}`}>
          <Form.Label>Built-Up Area (sq. ft)</Form.Label>
          <Form.Control
            type="number"
            name="builtUpArea"
            value={buildingData?.builtUpArea}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`employees-${index}`}>
          <Form.Label>No of Employees</Form.Label>
          <Form.Control
            type="number"
            name="employees"
            value={buildingData?.employees}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`workStations-${index}`}>
          <Form.Label>No of Workstations</Form.Label>
          <Form.Control
            type="number"
            name="workStations"
            value={buildingData?.workStations}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`elevations-${index}`}>
          <Form.Label>No of Elevations</Form.Label>
          <Form.Control
            type="number"
            name="elevations"
            value={buildingData?.elevations}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`escalators-${index}`}>
          <Form.Label>No of Escalators</Form.Label>
          <Form.Control
            type="number"
            name="escalators"
            value={buildingData?.escalators}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`staircases-${index}`}>
          <Form.Label>No of Staircases</Form.Label>
          <Form.Control
            type="number"
            name="staircases"
            value={buildingData?.staircases}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`facadeType-${index}`}>
          <Form.Label>Type of Facade</Form.Label>
          <Form.Control as="select" name="facadeType" value={buildingData?.facadeType} onChange={handleInputChange}>
            <option value="f1">F1</option>
            <option value="f2">F2</option>
            <option value="f3">F3</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`facadePhoto-${index}`}>
          <Form.Label>Upload Facade Photo</Form.Label>
          <Form.Control type="file" onChange={(e) => handleFileUpload(e, 'facadePhoto')} />
          {buildingData?.facadePhoto && <img src={buildingData?.facadePhoto} alt="Facade" style={{ width: "100px", height: "auto" }} />}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`facadeSqFt-${index}`}>
          <Form.Label>Facade Sq Ft</Form.Label>
          <Form.Control
            type="number"
            name="facadeSqFt"
            value={buildingData?.facadeSqFt}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`compoundSqFt-${index}`}>
          <Form.Label>Compound Sq Ft</Form.Label>
          <Form.Control
            type="number"
            name="compoundSqFt"
            value={buildingData?.compoundSqFt}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`compoundFlooring-${index}`}>
          <Form.Label>Compound Flooring</Form.Label>
          <Form.Control as="select" name="compoundFlooring" value={buildingData?.compoundFlooring} onChange={handleInputChange}>
            <option value="cf1">CF1</option>
            <option value="cf2">CF2</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`gradedBuilding-${index}`}>
          <Form.Label>Graded Building</Form.Label>
          <Form.Control as="select" name="gradedBuilding" value={buildingData?.gradedBuilding} onChange={handleInputChange}>
            <option value="Select">Select</option>
            <option value="Grade A">Grade A</option>
            <option value="Grade B">Grade B</option>
          </Form.Control>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`classOfBuilding-${index}`}>
          <Form.Label>Class of Building</Form.Label>
          <Form.Control as="select" name="classOfBuilding" value={buildingData?.classOfBuilding} onChange={handleInputChange}>
            <option value="heritage">Heritage</option>
            <option value="new">New</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`ageOfBuilding-${index}`}>
          <Form.Label>Age of Building</Form.Label>
          <Form.Control
            type="number"
            name="ageOfBuilding"
            value={buildingData?.ageOfBuilding}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

     
      <h3 style={{ textAlign: "left" }}>Building Layout</h3>
<Row className="mb-3">
  <Form.Group as={Col} md="6" controlId={`compound-${index}`}>
    <Form.Label>Compound</Form.Label>
    <Form.Control
      type="number"
      name="compound"
      value={buildingData?.buildingLayout.compound}
      onChange={(e) => handleInputChange({
        target: {
          name: "buildingLayout",
          value: { ...buildingData?.buildingLayout, compound: e.target.value }
        }
      })}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`basement-${index}`}>
          <Form.Label>Basement</Form.Label>
          <Form.Control
            type="number"
            name="basement"
            value={buildingData?.buildingLayout.basement}
            onChange={(e) => handleInputChange({
              target: {
                name: "buildingLayout",
                value: { ...buildingData?.buildingLayout, basement: e.target.value }
              }
            })}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`stiltParking-${index}`}>
          <Form.Label>Stilt Parking</Form.Label>
          <Form.Control
            type="number"
            name="stiltParking"
            value={buildingData?.buildingLayout.stiltParking}
            onChange={(e) => handleInputChange({
              target: {
                name: "buildingLayout",
                value: { ...buildingData?.buildingLayout, stiltParking: e.target.value }
              }
            })}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`floors-${index}`}>
          <Form.Label>Floors</Form.Label>
          <Form.Control
            type="number"
            name="floors"
            value={buildingData?.buildingLayout.floors}
            onChange={(e) => handleInputChange({
              target: {
                name: "buildingLayout",
                value: { ...buildingData?.buildingLayout, floors: e.target.value }
              }
            })}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`topFloorTerrace-${index}`}>
          <Form.Label>Top Floor Terrace</Form.Label>
          <Form.Control
            type="number"
            name="topFloorTerrace"
            value={buildingData?.buildingLayout.topFloorTerrace}
            onChange={(e) => handleInputChange({
              target: {
                name: "buildingLayout",
                value: { ...buildingData?.buildingLayout, topFloorTerrace: e.target.value }
              }
            })}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId={`noOfParking-${index}`}>
          <Form.Label>No of Parking</Form.Label>
          <Form.Control
            type="number"
            name="parking"
            value={buildingData?.buildingLayout.parking}
            onChange={(e) => handleInputChange({
              target: {
                name: "buildingLayout",
                value: { ...buildingData?.buildingLayout, parking: e.target.value }
              }
            })}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId={`noOfTwoWheelers-${index}`}>
          <Form.Label>No of Two Wheelers</Form.Label>
          <Form.Control
            type="number"
            name="twoWheelers"
            value={buildingData?.buildingLayout.twoWheelers}
            onChange={(e) => handleInputChange({
              target: {
                name: "buildingLayout",
                value: { ...buildingData?.buildingLayout, twoWheelers: e.target.value }
              }
            })}
            required
          />
        </Form.Group>
      </Row>

      <h3 style={{ textAlign: "left" }}>Parking Management System</h3>
      <Form.Group as={Col} md="6">
        <Form.Label >Have Parking Management System?</Form.Label>
        <Form.Check
          type="radio"
          label="Yes"
          name={`parkingManagement-${index}`}
          value="yes"
          checked={buildingData?.hasParkingManagementSystem === "yes"}
          onChange={() => setBuildingData(prev => ({ ...prev, hasParkingManagementSystem: "yes" }))}
        />
        <Form.Check
          type="radio"
          label="No"
          name={`parkingManagement-${index}`}
          value="no"
          checked={buildingData?.hasParkingManagementSystem === "no"}
          onChange={() => setBuildingData(prev => ({ ...prev, hasParkingManagementSystem: "no" }))}
        />
      </Form.Group>

      {buildingData?.hasParkingManagementSystem === "yes" && (
        <Form.Group as={Col} md="6" controlId={`parkingManagementCompany-${index}`}>
          <Form.Label>Company Name of Parking Management System</Form.Label>
          <Form.Control
            type="text"
            name="parkingManagementCompany"
            value={buildingData?.parkingManagementCompany}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      )}

      <h3 style={{ textAlign: "left" }}>Garden Area</h3>
      <Form.Group as={Col} md="6">
        <Form.Label>Have Garden Area?</Form.Label>
        <Form.Check
          type="radio"
          label="Yes"
          name={`gardenArea-${index}`}
          value="yes"
          checked={buildingData?.hasGardenArea === "yes"}
          onChange={() => setBuildingData(prev => ({ ...prev, hasGardenArea: "yes" }))}
        />
        <Form.Check
          type="radio"
          label="No"
          name={`gardenArea-${index}`}
          value="no"
          checked={buildingData?.hasGardenArea === "no"}
          onChange={() => setBuildingData(prev => ({ ...prev, hasGardenArea: "no" }))}
        />
      </Form.Group>

      {buildingData?.hasGardenArea === "yes" && (
        <Form.Group as={Col} md="6" controlId={`gardenAreaSqft-${index}`}>
          <Form.Label>Garden Area Sqft</Form.Label>
          <Form.Control
            type="number"
            name="gardenAreaSqFt"
            value={buildingData?.gardenAreaSqFt}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        
      )}

<form>
<Button
        variant="secondary"
        onClick={onPrevious}
        className="me-2"
        style={{ float: "left" }} 
        disabled={currentBuildingsIndex === ""} 
      >
        Previous
      </Button>

      <Button
       
        onClick={onNext}
        style={{ float: "right" }} 
        disabled={currentBuildingsIndex === numOfBuildings - 1} // Disable Next on last form
      >
        Next
      </Button>
</form>
    </div>
  );
};

export default Building;



























