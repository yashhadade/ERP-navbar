import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { FormContext } from "../FormContext/FormContextProvider";
import { useNavigate } from "react-router-dom";

const Premises = () => {
  const {
    setAllPremiseData,
    allPremisesData,
    setCurrentPremisesIndex,
    buildingcount,
    setBuildingCount,
    currentPremisesIndex,
    numOfPremises,
  } = useContext(FormContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    siteName: "",
    buildings: 0,
    // carpetArea: 0,
    // builtUpArea: 0,
    // basementUpArea: 0,
    // basement: 0,
    // floors: 0,
    // workStations: 0,
    employees: 0,
    operatingShifts: 1,
    shifts: [{ startTime: "", endTime: "" }],
    grade: "Select",
    tier: "",
    surveyDate: "",
    surveyBy: "",
    clientVisitingCard: null,
    locationPhoto: null,
    moreInfo: "",
    noOfPremises: 1,
  });

  const [surveyFields, setSurveyFields] = useState([{ surveyBy: '' }]);

  // State for list of survey users
  const [surveyUsers, setSurveyUsers] = useState(['User 1', 'User 2', 'User 3']);

  // State for the input value to add a new user
  const [newUser, setNewUser] = useState('');
  const [validated, setValidated] = useState(false);



  useEffect(() => {
    const newShifts = Array.from(
      { length: formData.operatingShifts },
      (_, i) => ({
        startTime: formData.shifts[i]?.startTime || "",
        endTime: formData.shifts[i]?.endTime || "",
      })
    );
    setFormData((prev) => ({ ...prev, shifts: newShifts }));
  }, [formData.operatingShifts]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleShiftChange = (i, field, value) =>
    setFormData((prev) => {
      const shifts = [...prev.shifts];
      shifts[i][field] = value;
      return { ...prev, shifts };
    });
  const handleFileUpload = (e, field) =>
    setFormData((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(e.target.files[0]),
    }));

      // Handle form field change


  // Handle adding a new survey field
  const handleAddSurvey = () => {
    setSurveyFields([...surveyFields, { surveyBy: '' }]); // Add new empty field
  };
    const handleSurveyChange = (index, e) => {
      const updatedSurveyFields = [...surveyFields];
      updatedSurveyFields[index][e.target.name] = e.target.value;
      setSurveyFields(updatedSurveyFields);
    };

    const handleAddUser = () => {
      if (newUser.trim() && !surveyUsers.includes(newUser.trim())) {
        setSurveyUsers([...surveyUsers, newUser.trim()]);
        setNewUser(''); // Clear input field after adding
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) e.stopPropagation();
    setValidated(true);
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

  const onNextForm = async (e) => {
    e.preventDefault();
    await setAllPremiseData((prev) => [...prev, formData]);

    setBuildingCount(formData.buildings);

    if (buildingcount > 0 || formData.buildings > 0) {
      navigate("/buildings");
    } else if (currentPremisesIndex < numOfPremises) {
      setCurrentPremisesIndex((prev) => prev + 1);
    } else {
      alert("Premises form done");  navigate("/survey");
    }
  };

  const handlePrevious = () => {
    if (currentPremisesIndex > 1) {
      setCurrentPremisesIndex(currentPremisesIndex - 1);
      setFormData(allPremisesData[currentPremisesIndex - 2] || {}); // Load data for the previous building if it exists
    } else {
      navigate("/survey");
    }
  };

  

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 className="form-title">Premises Form {currentPremisesIndex}</h1>

        <Row className="mb-3">
          {renderFormField("siteName", "Name of Site", "text", {
            required: true,
          })}
          {renderFormField("buildings", "Buildings", "number", {
            required: true,
          })}
           {renderFormField("employees", "Employees", "number", {
            required: true,
          })}
          {/* {renderFormField("carpetArea", "Carpet Area (sq. ft)", "number", {
            required: true,
          })} */}
        </Row>

        {/* <Row className="mb-3">
          {renderFormField("builtUpArea", "Built-Up Area (sq. ft)", "number", {
            required: true,
          })}
          {renderFormField("basement", "Basement", "number", {
            required: true,
          })}
          {renderFormField(
            "basementUpArea",
            "Basement Up Area (sq. ft)",
            "number",
            { required: true }
          )}
        </Row> */}

        <Row className="mb-3">
          {/* {renderFormField("floors", "Floors", "number", { required: true })}
          {renderFormField("workStations", "Work Stations", "number", {
            required: true,
          })} */}
         
           {/* {renderFormField("surveyDate", "Survey Date", "date")} */}
           <Row className="mb-3">
          <Form.Label>Survey By</Form.Label>
          {surveyFields.map((_, index) => (
        <Form.Group as={Col} md="4" controlId={`surveyBy-${index}`} key={index}>
          <Form.Select
            name="surveyBy"
            value={surveyFields[index]?.surveyBy || ''}
            onChange={(e) => handleSurveyChange(index, e)}
            required
          >
            <option>--Select--</option>
            {surveyUsers.map((user, userIndex) => (
              <option key={userIndex} value={user}>
                {user}
              </option>
            ))}
          </Form.Select>
         
       
        </Form.Group>
      ))}

      {/* Input for adding a new survey user */}
      <InputGroup className="mb-3">
        <FormControl 
          className="custom-button" placeholder="Enter new user name" 
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleAddUser}  className= "custom-butn" >
          Add User
        </Button>
      </InputGroup>

        </Row>
        {/* Survey Fields - End */}

        <Row className="mb-3">
          {renderFormField("surveyDate", "Survey Date", "date")}
          {renderFormField("operatingShifts", "Operating Shifts", "number", {
            min: 1,
            required: true,
          })}
        </Row>
          
          
        </Row>

        <Row className="mb-3">
         
         {formData?.shifts?.map((shift, i) => (
          <Row className="mb-3" key={i}>
            {renderFormField(
              `shiftStartTime-${i}`,
              `Shift Start Time ${i + 1}`,
              "time",
              {
                value: shift.startTime,
                onChange: (e) =>
                  handleShiftChange(i, "startTime", e.target.value),
                required: true,
              }
            )}
            {renderFormField(
              `shiftEndTime-${i}`,
              `Shift End Time ${i + 1}`,
              "time",
              {
                value: shift.endTime,
                onChange: (e) =>
                  handleShiftChange(i, "endTime", e.target.value),
                required: true,
              }
            )}


          </Row>
        ))}
        
        
        </Row>

       

        <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="grade">
            <Form.Label>Grade of Premises</Form.Label>
            <Form.Select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
            >
              <option>--Select--</option>
              <option>Silver</option>
              <option>Platinum</option>
              <option>Gold</option>
            </Form.Select>
          </Form.Group>
         
          {renderFormField("tier", "Tier of Premises")}
        </Row>

        <Button
          variant="secondary"
          onClick={handlePrevious}
          className="me-2"
          style={{ float: "left" }} // Position Previous button to the left
          disabled={currentPremisesIndex === ""} // Disabled on Survey form return condition
        >
          Previous
        </Button>

        <Button
          variant="primary"
          className="me-2"
          // onClick={formData.buildings < 0? buildingOpen: onNext}
          onClick={onNextForm}
          style={{ float: "right" }} // Position Next button to the right
          // disabled={currentPremisesIndex === numOfPremises - 1} // Disable Next on last form
        >
          Next
        </Button>
      </Form>

      {/* {showBuildingForm && (
          <Buildings currentPremisesIndex={currentPremisesIndex} />
        )} */}
    </>
  );
};

export default Premises;
