import React, { useContext, useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { FormContext } from "../FormContext/FormContextProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Basement = ({ onPrevious, numOfBasements }) => {
  const {
    allBasementsData,
    setAllBasementsData,
    currentBaseMentIndex,
    setCurrentBaseMEntIndex,
    setCurrentBuilidingIndex,
    buildingcount,
    floornBasementCount, setFloornBasementCount
  } = useContext(FormContext);

  const location = useLocation();

  const {basement, floor } = floornBasementCount;

  console.log(basement ,floornBasementCount);
  
  const navigate = useNavigate();
  const [currentFormCount, setCurrentFormCount] = useState(1);
  const [currentType, setCurrentType] = useState(
    basement > 0 ? "Basement" : "Floor"
  );

  const [formData, setFormData] = useState({
    type: "",
    name: "",
    carpetArea: 0,
    flooringType: "",
    ceilingHeight: 0,
    photo: null,
    remarks: "",
    ambiance: "",
    numberOfPumpRooms: 0,
    numberOfDriversRooms: 0,
    numberOfStoreRooms: 0,
    numberOfReceptions: 0,
    numberOfLounges: 0,
    numberOfLobbies: 0,
    numberOfElectricalRooms: 0,
    numberOfGentsToilets: 0,
    numberOfLadiesToilets: 0,
    numberOfAdditionalToilets: 0,
    numberOfCarParks: 0,
    numberOfGenerators: 0,
    numberOfUndergroundPumps: 0,
    numberOfRainwaterPumps: 0,
    numberOfStaffDining: 0,
    numberOfManagerOffices: 0,
    numberOfStaffRestArea: 0,
    anyOtherRooms: 0,
  });

  const [validated, setValidated] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
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
  };

  const handleNextForm = async (e) => {
    e.preventDefault();
    await setAllBasementsData((prev) => {
      const updatedData = [...prev];

      updatedData[currentBaseMentIndex - 1] = formData; // Store current data at the index for the building
      return updatedData;
    });

    if (currentType === "Basement" && currentFormCount < basement) {
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setCurrentFormCount((prevCount) => prevCount + 1);
    } else if (
      currentType === "Basement" &&
      currentFormCount == basement
    ) {
      setCurrentType("Floor");
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setCurrentFormCount(1);
    } else if (currentType === "Floor" && currentFormCount < floor) {
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setCurrentFormCount((prevCount) => prevCount + 1);
    } else if(currentBaseMentIndex > buildingcount){
      setCurrentBuilidingIndex((prevCount) => prevCount + 1);
      navigate("/buildings");
    }



    // if(numOfPremises > currentPremisesIndex) {
    //   setCurrentPremisesIndex(currentPremisesIndex + 1);
    //   navigate("/premises");
    // } else {
    //   alert("Premises form done")
    // }
  };

  const handlePreviousForm = () => {
    if (currentFormCount > 1) {
      setCurrentBaseMEntIndex((prev) => prev - 1);
      setCurrentFormCount((prevCount) => prevCount - 1);
      // Load previous form data if it exists in `allBasementsData`
      setFormData(allBasementsData[currentBaseMentIndex - 2] || {});
    } else if (currentType == "Floor" && currentFormCount === 1) {
      // Switch back to basements when moving back from the first floor form
      setCurrentType("Basement");
      setCurrentFormCount(basement);
      setCurrentBaseMEntIndex(basement);
      // Load the last basement form data
      setFormData(allBasementsData[basement - 1] || {});
    } else if (currentType == "Basement" && currentFormCount === 1) {
      navigate("/buildings");
    }
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
            <Row className="mb-3">{/* Form fields for each basement... */}</Row>
          </div>
        ))}
        <h2>
          {currentType} {currentFormCount}
        </h2>

        {/* updated */}

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={formData?.type}
              onChange={handleInputChange}
              defaultValue={currentType}
              requiredd
            >
              <option value="Floor">Floor</option>
              <option value="Basement">Basement</option>
              <option value="select" disabled>
                Select Type
              </option>
            </Form.Select>
          </Form.Group>
          {renderFormField("name", "Name", "text", { requiredd: true })}
        </Row>

        <Row className="mb-3">
          {renderFormField("carpetArea", "Carpet Area (sq. ft)", "number", {
            requiredd: true,
          })}
          <Form.Group as={Col} md="4" controlId="flooringType">
            <Form.Label>Flooring Type</Form.Label>
            <Form.Select
              name="flooringType"
              value={formData.flooringType}
              onChange={handleInputChange}
              requiredd
            >
              <option>--Select--</option>
              <option>Tile</option>
              <option>Wood</option>
              <option>Carpet</option>
            </Form.Select>
          </Form.Group>
          {renderFormField("ceilingHeight", "Ceiling Height (ft)", "number", {
            requiredd: true,
          })}
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="photo">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" onChange={handleFileUpload} />
            {formData.photo && (
              <Button variant="link" onClick={() => setShowPhoto(true)}>
                View Photo
              </Button>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          {renderFormField("remarks", "Remarks")}
          {renderFormField("ambiance", "Ambiance")}
        </Row>

        <Row className="mb-3">
          {renderFormField(
            "numberOfPumpRooms",
            "Number of Pump Rooms",
            "number"
          )}
          {renderFormField(
            "numberOfDriversRooms",
            "Number of Drivers Rooms",
            "number"
          )}
          {renderFormField(
            "numberOfStoreRooms",
            "Number of Store Rooms",
            "number"
          )}
          {renderFormField(
            "numberOfReceptions",
            "Number of Receptions",
            "number"
          )}
          {renderFormField("numberOfLounges", "Number of Lounges", "number")}
          {renderFormField("numberOfLobbies", "Number of Lobbies", "number")}
        </Row>

        <Row className="mb-3">
          {renderFormField(
            "numberOfElectricalRooms",
            "Number of Electrical Rooms",
            "number"
          )}
          {renderFormField(
            "numberOfGentsToilets",
            "Number of Gents Toilets",
            "number"
          )}
          {renderFormField(
            "numberOfLadiesToilets",
            "Number of Ladies Toilets",
            "number"
          )}
        </Row>

        <Row className="mb-3">
          {renderFormField(
            "numberOfAdditionalToilets",
            "Number of Additional Toilets",
            "number"
          )}
          {renderFormField("numberOfCarParks", "Number of Car Parks", "number")}
          {renderFormField(
            "numberOfGenerators",
            "Number of Generators",
            "number"
          )}
          {renderFormField(
            "numberOfUndergroundPumps",
            "Number of Underground Pumps",
            "number"
          )}
          {renderFormField(
            "numberOfRainwaterPumps",
            "Number of Rainwater Pumps",
            "number"
          )}
          {renderFormField(
            "numberOfStaffDining",
            "Number of Staff Dining",
            "number"
          )}
        </Row>

        <Row className="mb-3">
          {renderFormField(
            "numberOfManagerOffices",
            "Number of Manager Offices",
            "number"
          )}
          {renderFormField(
            "numberOfStaffRestArea",
            "Number of Staff Rest Area",
            "number"
          )}
          {renderFormField("anyOtherRooms", "Any Other Rooms", "number")}
        </Row>

        <Button
          variant="secondary"
          onClick={handlePreviousForm}
          className="me-2"
          style={{ float: "left" }}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="me-2"
          style={{ float: "right" }}
          onClick={handleNextForm}
        >
          Next
        </Button>
      </Form>

      {/* modal for viewing the photo */}
      <Modal show={showPhoto} onHide={() => setShowPhoto(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Photo Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={formData.photo}
            alt="Basement"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Basement;