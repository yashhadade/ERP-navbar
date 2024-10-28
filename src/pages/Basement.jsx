import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import { FormContext } from "../FormContext/FormContextProvider";
import { useNavigate } from "react-router-dom";


const Basement = ({ onPrevious, onNext, currentBasementIndex, numOfBasements, basementForms, setAllBasementData, allBasementsData }) => {
  const { setAllBasementData, allBuildingData } = useContext(FormContext);
  const [formData, setFormData] = useState({
    type: "--Select--", name: "", carpetArea: 0, flooringType: "", ceilingHeight: 0, photo: null,remarks: "",
    ambiance: "", numberOfPumpRooms: 0, numberOfDriversRooms: 0, numberOfStoreRooms: 0,numberOfReceptions: 0,
    numberOfLounges: 0, numberOfLobbies: 0, numberOfElectricalRooms: 0, numberOfGentsToilets: 0,
    numberOfLadiesToilets: 0, numberOfAdditionalToilets: 0, numberOfCarParks: 0, numberOfGenerators: 0,
    numberOfUndergroundPumps: 0, numberOfRainwaterPumps: 0, numberOfStaffDining: 0,numberOfManagerOffices: 0,
    numberOfStaffRestArea: 0, anyOtherRooms: 0, });

  const [validated, setValidated] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    setAllBasementData(basementForms);
    onNext();
  };

  

  const renderFormField = (name, label, type = "text", props = {}) => (
    <Form.Group as={Col} md="4" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control 
        type={type} 
        name={name} 
        value={formData[name] || ""} 
        onChange={handleInputChange} 
        {...props} 
      />
    </Form.Group>
  );

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 className="form-title">Basement & Floor Form</h1>

{/* updated */}

       {/* Render multiple basement forms based on numOfBasements */}
       {[...Array(numOfBasements)].map((_, index) => (
        <div key={index}>
          
          <h2>Basement {index + 1}</h2>
          <Row className="mb-3">
            {/* Form fields for each basement... */}
          </Row>
        </div>
      ))}

{/* updated */}

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleInputChange} required>
              <option>--Select--</option>
              <option>Basement</option>
              <option>Floor</option>
            </Form.Select>
          </Form.Group>
          {renderFormField("name", "Name", "text", { required: true })}
         
        </Row>

        <Row className="mb-3">
        {renderFormField("carpetArea", "Carpet Area (sq. ft)", "number", { required: true })}
          <Form.Group as={Col} md="4" controlId="flooringType">
            <Form.Label>Flooring Type</Form.Label>
            <Form.Select name="flooringType" value={formData.flooringType} onChange={handleInputChange} required>
              <option>--Select--</option>
              <option>Tile</option>
              <option>Wood</option>
              <option>Carpet</option>
             
            </Form.Select>
          </Form.Group>
          {renderFormField("ceilingHeight", "Ceiling Height (ft)", "number", { required: true })}
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="photo">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
            {formData.photo && (
              <Button variant="link" onClick={() => setShowPhoto(true)}>View Photo</Button>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          {renderFormField("remarks", "Remarks")}
          {renderFormField("ambiance", "Ambiance")}
        </Row>

        <Row className="mb-3">
          {renderFormField("numberOfPumpRooms", "Number of Pump Rooms", "number")}
          {renderFormField("numberOfDriversRooms", "Number of Drivers Rooms", "number")}
          {renderFormField("numberOfStoreRooms", "Number of Store Rooms", "number")}
          {renderFormField("numberOfReceptions", "Number of Receptions", "number")}
          {renderFormField("numberOfLounges", "Number of Lounges", "number")}
          {renderFormField("numberOfLobbies", "Number of Lobbies", "number")}
        </Row>

        <Row className="mb-3">
          {renderFormField("numberOfElectricalRooms", "Number of Electrical Rooms", "number")}
          {renderFormField("numberOfGentsToilets", "Number of Gents Toilets", "number")}
          {renderFormField("numberOfLadiesToilets", "Number of Ladies Toilets", "number")}
        </Row>

        <Row className="mb-3">
          {renderFormField("numberOfAdditionalToilets", "Number of Additional Toilets", "number")}
          {renderFormField("numberOfCarParks", "Number of Car Parks", "number")}
          {renderFormField("numberOfGenerators", "Number of Generators", "number")}
          {renderFormField("numberOfUndergroundPumps", "Number of Underground Pumps", "number")}
          {renderFormField("numberOfRainwaterPumps", "Number of Rainwater Pumps", "number")}
          {renderFormField("numberOfStaffDining", "Number of Staff Dining", "number")}
        </Row>

        <Row className="mb-3">
          {renderFormField("numberOfManagerOffices", "Number of Manager Offices", "number")}
          {renderFormField("numberOfStaffRestArea", "Number of Staff Rest Area", "number")}
          {renderFormField("anyOtherRooms", "Any Other Rooms", "number")}
        </Row>

        <Button variant="secondary" onClick={onPrevious} className="me-2" style={{ float: "left" }}>
          Previous
        </Button>
        <Button variant="primary" type="submit" className="me-2" style={{ float: "right" }}>
          Next
        </Button>
      </Form>

      {/* modal for viewing the photo */}
      <Modal show={showPhoto} onHide={() => setShowPhoto(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Photo Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={formData.photo} alt="Basement" style={{ width: '100%', height: 'auto' }} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Basement;
