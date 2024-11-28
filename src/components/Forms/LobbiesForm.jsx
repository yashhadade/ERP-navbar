import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row, Modal } from "react-bootstrap";

const LobbiesForm = () => {

  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    carpetArea: '',
    ceilingHeight: '',
    ambiance: '',
    facilitiesProvided: {
      teaCoffeeMachine: false,
      teaCoffeeServices: false,
      packageDrinkingWater: false,
      normalWater: false
    },
    crockery: {
      washables: false,
      disposables: false
    },
    AC: '',
    remarks: '',
    addPhoto: null 
  });


  useEffect(() => {
    console.log("Form Data Updated:", formData); 
  }, [formData]); 

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'checkbox') {
      const [parent, child] = name.split('.');

      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: checked
        }
      }));
    } else {
   
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      addPhoto: file ? URL.createObjectURL(file) : null
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      console.log("Form validation failed");
    } else {
      console.log("Form Data Submitted:", formData); 
    }
  };

  
  const handlePreviousForm = () => {
    console.log("Going to previous form");
   
  };

  const handleNext = () => {
    console.log("Going to next form");
  
  };


  return  (
    <div>
      <h2 className="text-center mt-3">Lobbies Form</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="lobbiesFormName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lobbiesFormCarpetArea">
            <Form.Label>Carpet Area (sq. ft)</Form.Label>
            <Form.Control
              required
              type="number"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="lobbiesFormCeilingHeight">
            <Form.Label>Ceiling Height (ft)</Form.Label>
            <Form.Control
              required
              type="number"
              name="ceilingHeight"
              value={formData.ceilingHeight}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lobbiesFormAddPhoto">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
            {formData.addPhoto && (
              <div>
                {/* <Button variant="link" onClick={() => setShowModal(true)}>View Photo</Button> */}
                <img
                  src={formData.addPhoto}
                  alt="Room Thumbnail"
                  style={{ width: "100px", height: "auto", marginTop: "10px" }}
                />
              </div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lobbiesFormAmbiance">
            <Form.Label>Ambiance</Form.Label>
            <Form.Control
              type="text"
              name="ambiance"
              value={formData.ambiance}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="lobbiesFormFacilitiesProvided">
            <Form.Label>Facilities Provided</Form.Label>
            <Form.Check
              type="checkbox"
              label="Tea Coffee Machine"
              name="facilitiesProvided.teaCoffeeMachine"
              checked={formData.facilitiesProvided.teaCoffeeMachine}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Tea Coffee Services"
              name="facilitiesProvided.teaCoffeeServices"
              checked={formData.facilitiesProvided.teaCoffeeServices}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Package Drinking Water"
              name="facilitiesProvided.packageDrinkingWater"
              checked={formData.facilitiesProvided.packageDrinkingWater}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Normal Water"
              name="facilitiesProvided.normalWater"
              checked={formData.facilitiesProvided.normalWater}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lobbiesFormCrockery">
            <Form.Label>Crockery</Form.Label>
            <Form.Check
              type="checkbox"
              label="Washables"
              name="crockery.washables"
              checked={formData.crockery.washables}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Disposables"
              name="crockery.disposables"
              checked={formData.crockery.disposables}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="lobbiesFormAC">
            <Form.Label>Have AC</Form.Label>
            <Form.Check
              type="radio"
              label="Yes"
              name="AC"
              value="yes"
              checked={formData.AC === "yes"}
              onChange={handleInputChange}
            />
            <Form.Check
              type="radio"
              label="No"
              name="AC"
              value="no"
              checked={formData.AC === "no"}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="lobbiesFormRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handlePreviousForm}>
            Previous
          </Button>
          <Button variant="primary" type="submit" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Form>

      {/* Modal to View the Uploaded Photo */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData.addPhoto && (
            <img
              src={formData.addPhoto}
              alt="Room"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LobbiesForm
