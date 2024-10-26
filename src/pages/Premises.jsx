import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';

const Premises = ({ onPrevious }) => {
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
    const fetchSurveyUsers = async () => {
      const users = ["User 1", "User 2", "User 3"]; // replace with API
      setSurveyUsers(users);
    };
    fetchSurveyUsers();
  }, []);

  
  useEffect(() => {
    const newShifts = Array.from({ length: formData.operatingShifts }, (_, index) => ({
      startTime: formData.shifts[index]?.startTime || "",
      endTime: formData.shifts[index]?.endTime || ""
    }));
    setFormData(prev => ({ ...prev, shifts: newShifts }));
  }, [formData.operatingShifts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShiftChange = (index, field, value) => {
    const newShifts = [...formData.shifts];
    newShifts[index][field] = value;
    setFormData(prev => ({ ...prev, shifts: newShifts }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    console.log("Form submitted:", formData);
  };

  return (


    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    
      <h1 className="form-title">Premises Survey </h1>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="siteName">
          <Form.Label>Name of Site</Form.Label>
          <Form.Control
            type="text"
            placeholder="Site Name"
            name="siteName"
            value={formData.siteName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="buildings">
          <Form.Label>Buildings</Form.Label>
          <Form.Control
            type="number"
            placeholder="Buildings"
            name="buildings"
            value={formData.buildings}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="carpetArea">
          <Form.Label>Carpet Area (sq. ft)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Carpet Area"
            name="carpetArea"
            value={formData.carpetArea}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="builtUpArea">
          <Form.Label>Built-Up Area (sq. ft)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Built-Up Area"
            name="builtUpArea"
            value={formData.builtUpArea}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="basement">
          <Form.Label>Basement</Form.Label>
          <Form.Control
            type="number"
            placeholder="Basement"
            name="basement"
            value={formData.basement}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="basementUpArea">
          <Form.Label>Basement Up Area (sq. ft)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Basement Up Area"
            name="basementUpArea"
            value={formData.basementUpArea}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="floors">
          <Form.Label>Floors</Form.Label>
          <Form.Control
            type="number"
            placeholder="Floors"
            name="floors"
            value={formData.floors}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="workStations">
          <Form.Label>Work Stations</Form.Label>
          <Form.Control
            type="number"
            placeholder="Work Stations"
            name="workStations"
            value={formData.workStations}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="employees">
          <Form.Label>Employees</Form.Label>
          <Form.Control
            type="number"
            placeholder="Employees"
            name="employees"
            value={formData.employees}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="surveyDate">
          <Form.Label>Survey Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Survey Date"
            name="surveyDate"
            value={formData.surveyDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="surveyBy">
          <Form.Label>Survey By</Form.Label>
          <Form.Select name="surveyBy" value={formData.surveyBy} onChange={handleInputChange} required>
            <option>--Select--</option>
            {surveyUsers.map((user) => (
              <option key={user} value={user}>{user}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="operatingShifts">
          <Form.Label>Operating Shifts</Form.Label>
          <Form.Control
            type="number"
            placeholder="Operating Shifts"
            name="operatingShifts"
            value={formData.operatingShifts}
            onChange={handleInputChange}
            min={1}
            required
          />
        </Form.Group>
      </Row>

      {formData.shifts.map((shift, index) => (
        <Row className="mb-3" key={index}>
          <Form.Group as={Col} md="4" controlId={`shiftStartTime-${index}`}>
            <Form.Label>Shift Start Time {index + 1}</Form.Label>
            <Form.Control
              type="time"
              value={shift.startTime}
              onChange={(e) => handleShiftChange(index, 'startTime', e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId={`shiftEndTime-${index}`}>
            <Form.Label>Shift End Time {index + 1}</Form.Label>
            <Form.Control
              type="time"
              value={shift.endTime}
              onChange={(e) => handleShiftChange(index, 'endTime', e.target.value)}
              required
            />
          </Form.Group>
        </Row>
      ))}


        <Form.Group as={Col} md="4" controlId="surveyBy">
          <Form.Label>Grade of Premises</Form.Label>
          <Form.Select name="surveyBy" value={formData.surveyBy} onChange={handleInputChange} required>
            <option>--Select--</option>
            <option>Silver</option>
            <option>Platinum</option>
            <option>Gold</option>
           
          </Form.Select>
        </Form.Group>

       
        <Form.Group as={Col} md="4" controlId="tier">
          <Form.Label>Tier of Premises</Form.Label>
          <Form.Control
            type="input"
            placeholder="Tier of Premises"
            name="tier"
            value={formData.tier}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
       



      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="clientVisitingCard">
          <Form.Label>Upload Client Visiting Card</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileUpload(e, "clientVisitingCard")}
          />
          {formData.clientVisitingCard && (
            <img src={formData.clientVisitingCard} alt="Client Visiting Card" style={{ width: "100px", height: "auto" }} />
          )}
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="locationPhoto">
          <Form.Label>Upload Location Photo</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFileUpload(e, "locationPhoto")}
          />
          {formData.locationPhoto && (
            <img src={formData.locationPhoto} alt="Location Photo" style={{ width: "100px", height: "auto" }} />
          )}
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="moreInfo">
          <Form.Label>More Information</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="moreInfo"
            value={formData.moreInfo}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Row>

      <Button variant="secondary" onClick={onPrevious}>Previous</Button>
      <Button type="submit">Save & Continue</Button>
    </Form>
  );

};


export default Premises;
