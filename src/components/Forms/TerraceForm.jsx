import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';

const TerraceForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    carpetArea: '',
    flooring: '',
    facilities: {
      teaCoffeeMachine: false,
      teaCoffeeServices: false,
      packageDrinkingWater: false,
      normalWater: false,
    },
    horticultureAvailable: '', 
    openParkingNos: '',
    remarks: '',
    entryExitGates: '',
    totalSecurity: '',
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
          [child]: checked,
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      addPhoto: file ? URL.createObjectURL(file) : null,
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

  return (
    <div>
      <h2 className="text-center mt-3">Compound Form</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="compoundFormName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="compoundFormCarpetArea">
            <Form.Label>Carpet Area (sq ft)</Form.Label>
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
          <Form.Group as={Col} md="4" controlId="compoundFormFlooring">
            <Form.Label>Flooring</Form.Label>
            <Form.Control
              required
              as="select"
              name="flooring"
              value={formData.flooring}
              onChange={handleInputChange}
            >
              <option value="">Select Flooring</option>
              <option value="f1">F1</option>
              <option value="f2">F2</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>Facilities Provided</Form.Label>
          <Form.Group as={Col} md="4">
            <Form.Check
              type="checkbox"
              label="Tea Coffee Machine"
              name="facilities.teaCoffeeMachine"
              checked={formData.facilities.teaCoffeeMachine}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Tea Coffee Services"
              name="facilities.teaCoffeeServices"
              checked={formData.facilities.teaCoffeeServices}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Package Drinking Water"
              name="facilities.packageDrinkingWater"
              checked={formData.facilities.packageDrinkingWater}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Normal Water"
              name="facilities.normalWater"
              checked={formData.facilities.normalWater}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="compoundFormHorticulture">
            <Form.Label>Horticulture Available</Form.Label>
            <Form.Control
              required
              as="select"
              name="horticultureAvailable"
              value={formData.horticultureAvailable}
              onChange={handleInputChange}
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="compoundFormOpenParkingNos">
            <Form.Label>Open Parking Nos</Form.Label>
            <Form.Control
              type="number"
              name="openParkingNos"
              value={formData.openParkingNos}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="compoundFormRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="compoundFormEntryExitGates">
            <Form.Label>Entry & Exit Gates</Form.Label>
            <Form.Control
              type="text"
              name="entryExitGates"
              value={formData.entryExitGates}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="compoundFormTotalSecurity">
            <Form.Label>Total No of Security</Form.Label>
            <Form.Control
              type="number"
              name="totalSecurity"
              value={formData.totalSecurity}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handlePreviousForm}>
            Previous
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Form>

      {/* Modal to View the Uploaded Photo (Optional) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData.addPhoto && (
            <img
              src={formData.addPhoto}
              alt="Room"
              style={{ width: '100%', height: 'auto' }}
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
};

export default TerraceForm
