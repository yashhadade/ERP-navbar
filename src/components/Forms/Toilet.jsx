import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormContext } from "../../FormContext/FormContextProvider";
import { useNavigate } from "react-router-dom";
const Toilet = () => {
  const {
    allToiletData,
    setAllToiletData,
    currectToiletIndex,
    setCurrectToiletIndex,
    toiletDiverRoomCount,
    setToiletDiverRoomCount,
    numOfPremises,
    setCurrentBaseMEntIndex,
    currentBuildingIndex,
    setCurrentBuilidingIndex,
    currentPremisesIndex,
    setCurrentPremisesIndex,
    buildingcount,
    currentFormType,
    setCurrentFormType,
    currentToiletType,
    setCurrentToiletType,setFloornBasementCount,floornBasementCount ,basementCount, setBasementCount
  } = useContext(FormContext);

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { basement, floor } = floornBasementCount;
  const [currentFormCount, setCurrentFormCount] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    carpetArea: "",
    ceilingHeight: "",
    acOption: "",
    cubicles: "",
    urinals: "",
    exhaustOption: "",
    washbasins: "",
    averageUsers: "",
    remarks: "",
    ambiance: "",
    toiletries: {
      handWipe: false,
      handWash: false,
      bodyWash: false,
    },
  });

  const { gentsToilet, ladiesToilet, driverRoom } = toiletDiverRoomCount;

  useEffect(() => {
    if (gentsToilet > 0) {
      setCurrentToiletType("Gents");
    } else if (ladiesToilet > 0) {
      setCurrentToiletType("Ladies");
    }
  }, []);

  // Photo
  const handleFileUpload = (e, field) =>
    setFormData((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(e.target.files[0]),
    }));
  // For Validation of the Form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        toiletries: {
          ...prev.toiletries,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  console.log(currentFormType,basementCount);
  
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    // TOdo validation of the form and it should be false on next
    //  setValidated(true);
  };
  const handleNext = async () => {
    await setAllToiletData((prev) => {
      const updatedData = [...prev, formData]; // Log the updated data
      return updatedData; // Save formData to allPremisesData
    });
    setFormData({
      name: "",
      carpetArea: "",
      ceilingHeight: "",
      acOption: "",
      cubicles: "",
      urinals: "",
      exhaustOption: "",
      washbasins: "",
      averageUsers: "",
      remarks: "",
      ambiance: "",
      toiletries: {
        handWipe: false,
        handWash: false,
        bodyWash: false,
      },
    });


    if (currentToiletType === "Gents" && currentFormCount < gentsToilet) {
      setCurrentToiletType("Gents");
      setCurrectToiletIndex((prev) => prev + 1);
      setCurrentFormCount((prevCount) => prevCount + 1);
    } else if (currentToiletType === "Gents" && currentFormCount == gentsToilet && ladiesToilet > 0) {
      setCurrentToiletType("Ladies");
      setCurrectToiletIndex((prev) => prev + 1);
      setCurrentFormCount(1);
    } else if (currentToiletType === "Ladies" && currentFormCount < ladiesToilet) {
        setCurrectToiletIndex((prev) => prev + 1);
      setCurrentFormCount((prevCount) => prevCount + 1);
    } else if (driverRoom > 0) {
      navigate("/driverroom");
    } else if (currentFormType === "Basement" && basementCount < basement) {
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setBasementCount((prevCount) => prevCount + 1);
      navigate("/basement");
    } else if (currentFormType === "Basement" && basementCount == basement) {
      setCurrentFormType("Floor");
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setBasementCount(1);
      navigate("/basement");
    } else if (currentFormType === "Floor" && basementCount < floor) {
      setCurrentFormType("Floor");
      setCurrentBaseMEntIndex((prev) => prev + 1);
      setBasementCount((prevCount) => prevCount + 1);   
      navigate("/basement");
    // } else if (currentFormType === "Floor" && basementCount == floor) {
    //   setCurrentDriverRoomtIndex(1);
    //   setCurrentBaseMEntIndex((prev) => prev + 1);
    //   setBasementCount(1);
    //   setCurrentFormType("Floor");
    //   navigate("/basement");
    }else if (currentBuildingIndex < buildingcount) {
      setCurrentBuilidingIndex((prevCount) => prevCount + 1);
      setFloornBasementCount({basement:0, floor:0});
      setCurrentFormType("")
      navigate("/buildings");
    } else if (numOfPremises > currentPremisesIndex) {
      setCurrentPremisesIndex(currentPremisesIndex + 1);
      navigate("/premises");
    } else {
      alert("Premises form done");
    }
  };


  const handlePreviousForm = () => {
    if (currentFormCount > 1) {
      setCurrectToiletIndex((prev) => prev - 1);
      setCurrentFormCount((prevCount) => prevCount - 1);
      // Load previous form data if it exists in `allBasementsData`
      setFormData(allToiletData[currectToiletIndex - 2] || {});
    } else if (currentToiletType == "Ladies" && currentFormCount === 1) {
      // Switch back to basements when moving back from the first floor form
      setCurrentToiletType("Gents");
      setCurrentFormCount(ladiesToilet);
      setCurrentBaseMEntIndex(ladiesToilet);
      // Load the last basement form data
      setFormData(allToiletData[ladiesToilet - 1] || {});
    } else if (currentToiletType == "Gents" && currentFormCount === 1) {
      navigate("/basement");
    }
  };

  return (
    <div>
      <h1>
        {currentToiletType} Toilet {currentFormCount} Form
      </h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Carpet area</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Carpet area"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Ceiling Height</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Ceiling height"
              name="ceilingHeight"
              value={formData.ceilingHeight}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Have AC</Form.Label>
            <Form.Check
              type="radio"
              id="ac-yes"
              label="YES"
              name="acOption"
              value="yes"
              checked={formData.acOption === "yes"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id="ac-no"
              label="NO"
              name="acOption"
              value="no"
              checked={formData.acOption === "no"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Cubicles</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Cubicles"
              name="cubicles"
              value={formData.cubicles}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom06">
            <Form.Label>Urinals</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Urinals"
              name="urinals"
              value={formData.urinals}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom07">
            <Form.Label>Have exhaust</Form.Label>
            <Form.Check
              type="radio"
              id="exhaust-yes"
              label="YES"
              name="exhaustOption"
              value="yes"
              checked={formData.exhaustOption === "yes"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id="exhaust-no"
              label="NO"
              name="exhaustOption"
              value="no"
              checked={formData.exhaustOption === "no"}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom08">
            <Form.Label>Washbasins</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Washbasins"
              name="washbasins"
              value={formData.washbasins}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom09">
            <Form.Label>Average users</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Average users"
              name="averageUsers"
              value={formData.averageUsers}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom10">
            <Form.Label>Toiletries provided</Form.Label>
            <Form.Check
              type="checkbox"
              id="hand-wipe"
              label="Hand Wipe"
              name="handWipe"
              checked={formData.toiletries.handWipe}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="hand-wash"
              label="Hand Wash"
              name="handWash"
              checked={formData.toiletries.handWash}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="body-wash"
              label="Body Wash"
              name="bodyWash"
              checked={formData.toiletries.bodyWash}
              onChange={handleChange}
            />
          </Form.Group>
          {["Urinals", "locationPhoto"].map((field) => (
            <Form.Group as={Col} md="4" key={field} controlId={field}>
              <Form.Label>
                {field === "Urinals"
                  ? "Upload Urinal Photo"
                  : "Upload Washbasins Photo"}
              </Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileUpload(e, field)}
              />
              {formData[field] && (
                <img
                  src={formData[field]}
                  alt={field}
                  style={{ width: "100px", height: "auto" }}
                />
              )}
            </Form.Group>
          ))}
        </Row>
        <Row>
          <Form.Group as={Col} md="4" controlId="Cubicles">
            <Form.Label>Upload the Photo of Cubicles</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleFileUpload(e, "Cubicles")}
            />
            {formData["Cubicles"] && (
              <img
                src={formData["Cubicles"]}
                alt="Cubicles"
                style={{ width: "100px", height: "auto" }}
              />
            )}
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom09">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom09">
            <Form.Label>Ambiance</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Ambiance"
              name="ambiance"
              value={formData.ambiance}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button variant="secondary" onClick={handlePreviousForm}>
          Previous
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="me-2"
          style={{ float: "right" }}
          onClick={handleNext}
        >
          Next
        </Button>
      </Form>
    </div>
  );
};

export default Toilet;
