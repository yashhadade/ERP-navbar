import React, { useContext, useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import FormContextProvider, {
  FormContext,
} from "../FormContext/FormContextProvider";
import { useNavigate } from "react-router-dom";

const DriverRoom = ({ onPrevious }) => {
  const {
    allDriverRoomData,
    setAllDriverRoomData,
    numOfPremises,
    currentPremisesIndex,
    setCurrentBuilidingIndex,
    currentBuildingIndex,
    buildingcount,
    setCurrentBaseMEntIndex,
    currentBaseMentIndex,
    toiletDiverRoomCount,
    setCurrentPremisesIndex,
    currentFormCount,
    currentDriverRoomtIndex,
    setCurrentDriverRoomtIndex,
    currentFormType,
    setCurrentFormType,
    floornBasementCount,
    setCurrentFormCount,
    setCurrentType,
    currentType,
    
  } = useContext(FormContext);

  const navigate = useNavigate();
  const { basement, floor } = floornBasementCount;
  const { driverRoom } = toiletDiverRoomCount;
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    carpetArea: "",
    flooringType: "Tile",
    ceilingHeight: "",
    addPhoto: null,
    ambiance: "",
    facilitiesProvided: {
      teaCoffeeMachine: false,
      teaCoffeeServices: false,
      packageDrinkingWater: false,
      normalWater: false,
    },
    crockery: {},
    remarks: "",
    AC: "",
  });

  const [showModal, setShowModal] = useState(false); // state to manage modal visibility

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        facilitiesProvided: {
          ...prevData.facilitiesProvided,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileUpload = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      addPhoto: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };
  console.log(currentFormType, currentFormCount, basement);

  const handleNext = async () => {
    await setAllDriverRoomData((prev) => [...prev, formData]);

    setFormData({
      name: "",
      carpetArea: "",
      flooringType: "",
      ceilingHeight: "",
      addPhoto: null,
      ambiance: "",
      facilitiesProvided: {
        teaCoffeeMachine: false,
        teaCoffeeServices: false,
        packageDrinkingWater: false,
        normalWater: false,
      },
      crockery: {},
      remarks: "",
      AC: "",
    });

    //

    if (driverRoom > currentDriverRoomtIndex) {
      console.log(currentDriverRoomtIndex, currentFormCount);
      setCurrentDriverRoomtIndex((prev) => prev + 1);
    } else if (currentFormType === "Basement" && currentFormCount < basement) {
      setCurrentDriverRoomtIndex(1);
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setCurrentFormCount((prevCount) => prevCount + 1);
      navigate("/basement");
    } else if (currentFormType === "Basement" && currentFormCount == basement) {
      setCurrentDriverRoomtIndex(1);
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setCurrentFormCount(1);
      setCurrentFormType("Floor");
      navigate("/basement");
    } else if (currentFormType === "Floor" && currentFormCount < floor) {
      setCurrentDriverRoomtIndex(1);
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setCurrentFormCount((prevCount) => prevCount + 1);
      setCurrentFormType("Floor");
      navigate("/basement");
    } else if (currentBuildingIndex < buildingcount) {
      setCurrentBuilidingIndex((prevCount) => prevCount + 1);
      navigate("/buildings");
    } else if (numOfPremises > currentPremisesIndex) {
      setCurrentPremisesIndex(currentPremisesIndex + 1);
      navigate("/premises");
    } else {
      alert("Premises form done");
    }
    {
    }
  };

  console.log(currentFormType);
  
  //

  console.log("Driver Room Data:", allDriverRoomData);
//
  const hanldePreviousForm = () => {
   
    
    if (currentDriverRoomtIndex > 1) {
      setCurrentDriverRoomtIndex(currentDriverRoomtIndex - 1);
      setAllDriverRoomData(allDriverRoomData[currentDriverRoomtIndex - 2] || {}); // load data for the for prev
    }
    else if ( currentDriverRoomtIndex === 1) {
      console.log(true);
      
      navigate("/toilet");
   
    } 
    // if (currentFormCount > 1) {
    //   setCurrentDriverRoomtIndex((prev) => prev - 1);
    //   setCurrentFormCount((prevCount) => prevCount - 1);
    //   // Load previous form data if it exists in `allDriverRoomData`
    //   setFormData(allDriverRoomData[currentDriverRoomtIndex - 2] || {});
    // } else if (currentType == "Ladies" && currentFormCount === 1) {
    //   // Switch back to toilets when moving back from the first floor form
    //   setCurrentType("Toilet");
    //   setCurrentFormCount(toilet);
    //   setCurrentDriverRoomtIndex(toilet);
    //   // Load the last basement form data
    //   setFormData(allDriverRoomData[toilet - 1] || {});
    // } else if (currentType == "Toilet" && currentFormCount === 1) {
    //   navigate("/toilet");
    // }


  }; 
  //

  

  return (
    <div>
      <h1 className="form-title" style={{ textAlign: "center" }}>
        Driver Room Form {currentDriverRoomtIndex}
      </h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="driverRoomFormName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="driverRoomFormCarpetArea">
            <Form.Label>Carpet Area (sq. ft)</Form.Label>
            <Form.Control
              required
              type="number"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="driverRoomFormFlooringType">
            <Form.Label>Flooring Type</Form.Label>
            <Form.Control
              as="select"
              name="flooringType"
              value={formData.flooringType}
              onChange={handleInputChange}
            >
              <option value="Tile">Tile</option>
              <option value="Wood">Wood</option>
              <option value="Carpet">Carpet</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="driverRoomFormCeilingHeight">
            <Form.Label>Ceiling Height (ft)</Form.Label>
            <Form.Control
              required
              type="number"
              name="ceilingHeight"
              value={formData.ceilingHeight}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="driverRoomFormAddPhoto">
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
          <Form.Group as={Col} md="4" controlId="driverRoomFormAmbiance">
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
          <Form.Group
            as={Col}
            md="4"
            controlId="driverRoomFormFacilitiesProvided"
          >
            <Form.Label>Facilities Provided</Form.Label>
            <Form.Check
              type="checkbox"
              label="Tea Coffee Machine"
              name="teaCoffeeMachine"
              checked={formData.facilitiesProvided.teaCoffeeMachine}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Tea Coffee Services"
              name="teaCoffeeServices"
              checked={formData.facilitiesProvided.teaCoffeeServices}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Package Drinking Water"
              name="packageDrinkingWater"
              checked={formData.facilitiesProvided.packageDrinkingWater}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Normal Water"
              name="normalWater"
              checked={formData.facilitiesProvided.normalWater}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="driverRoomFormCrockery">
            <Form.Label>Crockery</Form.Label>
            <Form.Check
              type="checkbox"
              label="Washables"
              name="washables"
              checked={formData.crockery.washables}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              label="Disposables"
              name="disposables"
              checked={formData.crockery.disposables}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="driverRoomFormAC">
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
          <Form.Group as={Col} md="4" controlId="driverRoomFormRemarks">
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
          <Button
            variant="secondary"
            onClick={hanldePreviousForm}
            // disabled={currentDriverRoomtIndex === 0}
          >
            Previous
          </Button>
          <Button variant="primary" type="submit" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Form>

      {/* Modal for Viewing the Photo */}
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
};

export default DriverRoom;

// else if (driverRoom>0){
//     navigate("/driverroom")
//   }
//   else if(currentBaseMentIndex<floornBasementCount.basement||currentBaseMentIndex<floornBasementCount.floor){
//     setCurrentBaseMEntIndex((prevCount)=>prevCount+1)
//     navigate("/basement")
//   }
//   else if(currentBuildingIndex < buildingcount){
//     setCurrentBuilidingIndex((prevCount) => prevCount + 1);
//     navigate("/buildings");
//   }else if (numOfPremises > currentPremisesIndex) {
//     setCurrentPremisesIndex(currentPremisesIndex + 1);
//     navigate("/premises");
//   } else {
//     alert("Premises form done")
//   }{

//   }
// }
