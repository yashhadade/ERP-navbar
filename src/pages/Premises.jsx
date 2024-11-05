import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormContext } from "../FormContext/FormContextProvider";
import { useNavigate } from "react-router-dom";

const Premises = ({ onPrevious }) => {
  const {
    setAllPremiseData,
    allPremisesData,
    setCurrentPremisesIndex,
    setBuildingCount,
    currentPremisesIndex,
    numOfPremises
  } = useContext(FormContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    siteName: "",
    buildings: 0,
    carpetArea: 0,
    builtUpArea: 0,
    basementUpArea: 0,
    basement: 0,
    floors: 0,
    workStations: 0,
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

  const [surveyUsers, setSurveyUsers] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setSurveyUsers(["User 1", "User 2", "User 3"]);
  }, []);




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

    const handleInputChange = (e) =>
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

    if(formData.buildings > 0){
      navigate("/buildings")

    }else if (currentPremisesIndex < numOfPremises) {
    setCurrentPremisesIndex(prev => prev+1)    
    
    }else{
      alert("Premises form done");
    }


  };
  
  const hanldePreviousForm = () => {
    if (currentPremisesIndex > 0) {
      setCurrentPremisesIndex(currentPremisesIndex - 1);
      setFormData(allPremisesData[currentPremisesIndex - 2] || {}); // Load data for the previous building if it exists
    }
  };  

    console.log(currentPremisesIndex, numOfPremises);

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
            {renderFormField("carpetArea", "Carpet Area (sq. ft)", "number", {
              required: true,
            })}
          </Row>

          <Row className="mb-3">
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
          </Row>

          <Row className="mb-3">
            {renderFormField("floors", "Floors", "number", { required: true })}
            {renderFormField("workStations", "Work Stations", "number", {
              required: true,
            })}
            {renderFormField("employees", "Employees", "number", {
              required: true,
            })}
          </Row>

          <Row className="mb-3">
            {renderFormField("surveyDate", "Survey Date", "date")}
            <Form.Group as={Col} md="4" controlId="surveyBy">
              <Form.Label>Survey By</Form.Label>
              <Form.Select
                name="surveyBy"
                value={formData.surveyBy}
                onChange={handleInputChange}
                required
              >
                <option>--Select--</option>
                {surveyUsers.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {renderFormField("operatingShifts", "Operating Shifts", "number", {
              min: 1,
              required: true,
            })}
          </Row>

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
            onClick={onPrevious}
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
            style={{ float: "right"  }} // Position Next button to the right
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
