import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';

const EscalatorForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    make: '',
    capacity: '',
    yearInstalled: '',
    underAMC: '',
    amcType: '', 
    licenseExpiry: '',
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

  return (
    <div>
      <h2 className="text-center mt-3">Escalator Form</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="escalatorFormName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="escalatorFormMake">
            <Form.Label>Make</Form.Label>
            <Form.Control
              required
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="escalatorFormCapacity">
            <Form.Label>Capacity (kg)</Form.Label>
            <Form.Control
              required
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="escalatorFormYearInstalled">
            <Form.Label>Year Installed</Form.Label>
            <Form.Control
              required
              type="number"
              name="yearInstalled"
              value={formData.yearInstalled}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="escalatorFormUnderAMC">
            <Form.Label>Under AMC</Form.Label>
            <Form.Check
              type="radio"
              label="Yes"
              name="underAMC"
              value="yes"
              checked={formData.underAMC === 'yes'}
              onChange={handleInputChange}
            />
            <Form.Check
              type="radio"
              label="No"
              name="underAMC"
              value="no"
              checked={formData.underAMC === 'no'}
              onChange={handleInputChange}
            />
          </Form.Group>
          
          {formData.underAMC === 'yes' && (
            <Form.Group as={Col} md="4" controlId="escalatorFormAMCTYPE">
              <Form.Label>AMC Type</Form.Label>
              <Form.Check
                type="radio"
                label="OEM AMC"
                name="amcType"
                value="OEM"
                checked={formData.amcType === 'OEM'}
                onChange={handleInputChange}
              />
              <Form.Check
                type="radio"
                label="Third-party AMC"
                name="amcType"
                value="Third-party"
                checked={formData.amcType === 'Third-party'}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}

          <Form.Group as={Col} md="4" controlId="escalatorFormLicenseExpiry">
            <Form.Label>License Expiry</Form.Label>
            <Form.Control
              required
              type="date"
              name="licenseExpiry"
              value={formData.licenseExpiry}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="escalatorFormAddPhoto">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
            {formData.addPhoto && (
              <div>
                <img
                  src={formData.addPhoto}
                  alt="Escalator Thumbnail"
                  style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                />
              </div>
            )}
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
              alt="Escalator"
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

export default EscalatorForm
