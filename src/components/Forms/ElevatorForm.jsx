import React, { useState, useEffect, useContext } from 'react';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import { FormContext } from "../../FormContext/FormContextProvider";
import { useNavigate, useParams } from "react-router-dom";

const ElevatorForm = ({ onPrevious, onNext }) => {
  const { elevatorData, setElevatorData, currentBuildingIndex, elevatorFormCount, buildingData } = useContext(FormContext);
  const { elevatorNumber } = useParams(); // this will give you the number of the form
  const navigate = useNavigate();

  // State to manage form data and flow
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
  const [currentElevationForm, setCurrentElevationForm] = useState(0); // To track current form index

  // Set elevator data when the form is loaded
  useEffect(() => {
    if (elevatorData[elevatorNumber - 1]) {
      setElevatorData(elevatorData[elevatorNumber - 1]);
    }
  }, [elevatorNumber, elevatorData]);

  // Handle input change in the form
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

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      addPhoto: file ? URL.createObjectURL(file) : null
    }));
  };

  // Handle form submission (Next/Submit)
  const handleElevationFormSubmit = (e) => {
    e.preventDefault();
    
    // Update elevator data for the current form
    setElevatorData((prev) => {
      const newData = [...prev];
      newData[elevatorNumber - 1] = formData;
      return newData;
    });

    // If it's not the last elevator form, navigate to the next one
    if (parseInt(elevatorNumber) < elevatorFormCount) {
      navigate(`/elevatorForm/${parseInt(elevatorNumber) + 1}`);
    } else {
      // If no more elevator forms, navigate to basement form (or next logical form)
      if (buildingData?.basement > 0) {
        navigate("/basement");
      } else {
        navigate("/survey"); // Replace with the next step if needed
      }
    }
  };

  // Handle previous form navigation
  const handlePreviousForm = () => {
    if (parseInt(elevatorNumber) > 1) {
      navigate(`/elevatorForm/${parseInt(elevatorNumber) - 1}`);
    } else {
      navigate("/buildings"); // Go back to building form or wherever appropriate
    }
  };

  return (
    <div>
      <h2 className="text-center mt-3">Elevator Form</h2>
      <Form noValidate validated={validated} onSubmit={handleElevationFormSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="elevatorFormName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="elevatorFormMake">
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
          <Form.Group as={Col} md="4" controlId="elevatorFormCapacity">
            <Form.Label>Capacity (kg)</Form.Label>
            <Form.Control
              required
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="elevatorFormYearInstalled">
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
          <Form.Group as={Col} md="4" controlId="elevatorFormUnderAMC">
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
            <Form.Group as={Col} md="4" controlId="elevatorFormAMCTYPE">
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

          <Form.Group as={Col} md="4" controlId="elevatorFormLicenseExpiry">
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
          <Form.Group as={Col} md="4" controlId="elevatorFormAddPhoto">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
            {formData.addPhoto && (
              <div>
                <img
                  src={formData.addPhoto}
                  alt="Elevator Thumbnail"
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
          <Button variant="primary" type="submit">
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
              alt="Elevator"
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

export default ElevatorForm;
