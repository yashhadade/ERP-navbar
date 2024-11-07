import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Premises from "./Premises";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../FormContext/FormContextProvider";

const Survey = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showNextForm, setShowNextForm] = useState(false);

  const {
    surveyData,
    setSurveData,
    setNumOfPremises,
    setCurrentPremisesIndex,
    numOfPremises,
  } = useContext(FormContext);

  const [surveyForm, setSurveyForm] = useState({
    clientName: "",
    siteName: "",
    businessCategory: "",
    city: "",
    state: "",
    zip: "",
    siteInchargeName: "",
    siteInchargeEmail: "",
    siteInchargePhone: "",
    commercialInchargeName: "",
    commercialInchargeEmail: "",
    commercialInchargePhone: "",
    locationInchargeName: "",
    locationInchargeEmail: "",
    locationInchargePhone: "",
    referralInchargeName: "",
    referralInchargeEmail: "",
    referralInchargePhone: "",
    sentProposalTo: {
      siteIncharge: false,
      commercialIncharge: false,
      locationIncharge: false,
    },
    servicesRequired: {
      serviceOne: false,
      serviceTwo: false,
      serviceThree: false,
    },
    additionalServices: {
      additionalOne: false,
      additionalTwo: false,
      additionalThree: false,
    },
    premisesType: "",
    premises: 0,
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handlePrevious = () => {
    setShowNextForm(false);
    setCurrentPremisesIndex(0); // reset to the main form when going back
  };

  const handleChange = (e) => {
    const { name, type, checked } = e.target;

    if (type === "checkbox") {
      // Determine where to update the state based on the name
      if (name in surveyForm.sentProposalTo) {
        // Update sentProposalTo
        setSurveyForm((prev) => ({
          ...prev,
          sentProposalTo: {
            ...prev.sentProposalTo,
            [name]: checked,
          },
        }));
      } else if (name in surveyForm.servicesRequired) {
        // Update servicesRequired
        setSurveyForm((prev) => ({
          ...prev,
          servicesRequired: {
            ...prev.servicesRequired,
            [name]: checked,
          },
        }));
      } else if (name in surveyForm.additionalServices) {
        // Update additionalServices
        setSurveyForm((prev) => ({
          ...prev,
          additionalServices: {
            ...prev.additionalServices,
            [name]: checked,
          },
        }));
      }
    } else {
      // For other inputs
      setSurveyForm((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }
  };
  //

  // };

  //

  const onNextForm = async (e) => {
    e.preventDefault();
    await setSurveData((prev) => {
      const updatedData = [...prev, surveyForm];
      return updatedData;
    });

    setNumOfPremises(surveyForm?.premises);
    if (numOfPremises > 0 || surveyForm.premises > 0) {
      navigate("/premises");
    } else {
      alert("Survey added");
    }
  };

  return (
    <>
      {/*btn to export data*/}
      {/* <button onClick={exportDataToExcel}>
      Export Data to Excel
    </button>  */}

      <div className="main-container">
        <div className="container">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Survey Form</h1>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Client Name"
                  name="clientName"
                  value={surveyForm.clientName}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Site Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Site Name"
                  name="siteName"
                  value={surveyForm.siteName}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Business Category</Form.Label>
                <Form.Select required>
                  <option>Open this select menu</option>
                  <option value="1">Category One</option>
                  <option value="2">Category Two</option>
                  <option value="3">Category Three</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>City</Form.Label>
                <Form.Select required>
                  <option>Open this select menu</option>
                  <option value="1">City One</option>
                  <option value="2">City Two</option>
                  <option value="3">City Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>State</Form.Label>
                <Form.Select required>
                  <option>Open this select menu</option>
                  <option value="1">State One</option>
                  <option value="2">State Two</option>
                  <option value="3">State Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom06">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
                  required
                  name="zip"
                  value={surveyForm.zip}
                  onChange={(e) => handleChange(e)}
                  minLength={6}
                  maxLength={6}
                />
              </Form.Group>
            </Row>
            <hr></hr>
            <Row className="mb-3">
              <h4>Site Incharge</h4>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Site Incharge Name"
                  name="siteInchargeName"
                  value={surveyForm.siteInchargeName}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Site Incharge Email"
                  name="siteInchargeEmail"
                  value={surveyForm.siteInchargeEmail}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="site Incharge Phone"
                  name="siteInchargePhone"
                  value={surveyForm.siteInchargePhone}
                  onChange={(e) => handleChange(e)}
                  minLength={10}
                  maxLength={10}
                />
              </Form.Group>
            </Row>
            <hr></hr>
            <Row className="mb-3">
              <h4>Commercial Incharge</h4>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Commercial Incharge Name"
                  name="commercialInchargeName"
                  value={surveyForm.commercialInchargeName}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Commercial Incharge Email"
                  name="commercialInchargeEmail"
                  value={surveyForm.commercialInchargeEmail}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Commercial Incharge Phone"
                  name="commercialInchargePhone"
                  value={surveyForm.commercialInchargePhone}
                  onChange={(e) => handleChange(e)}
                  minLength={10}
                  maxLength={10}
                />
              </Form.Group>
            </Row>
            <hr></hr>
            <Row className="mb-3">
              <h4>Location Incharge</h4>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="location Incharge Name"
                  name="locationInchargeName"
                  value={surveyForm.locationInchargeName}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="location Incharge Email"
                  name="locationInchargeEmail"
                  value={surveyForm.locationInchargeEmail}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="location Incharge Phone"
                  name="locationInchargePhone"
                  value={surveyForm.locationInchargePhone}
                  onChange={(e) => handleChange(e)}
                  minLength={10}
                  maxLength={10}
                />
              </Form.Group>
            </Row>
            <hr></hr>
            <Row className="mb-3">
              <h4>Referral Incharge</h4>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="location Incharge Name"
                  name="locationInchargeName"
                  value={surveyForm.locationInchargeName}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="location Incharge Email"
                  name="locationInchargeEmail"
                  value={surveyForm.locationInchargeEmail}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="location Incharge Phone"
                  name="locationInchargePhone"
                  value={surveyForm.locationInchargePhone}
                  onChange={(e) => handleChange(e)}
                  minLength={10}
                  maxLength={10}
                />
              </Form.Group>
            </Row>
            <hr></hr>
            <Row className="mb-3">
              <h2>Referral Incharge</h2>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Referral Incharge Name"
                  name="referralInchargeName"
                  value={surveyForm.referralInchargeName}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Referral Incharge Email"
                  name="referralInchargeEmail"
                  value={surveyForm.referralInchargeEmail}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Referral Incharge Phone"
                  name="referralInchargePhone"
                  value={surveyForm.referralInchargePhone}
                  onChange={(e) => handleChange(e)}
                  minLength={10}
                  maxLength={10}
                />
              </Form.Group>
            </Row>
            <hr></hr>

            <Row className="mb-3">
              <h4>Sent Proposal To</h4>
              {["siteIncharge", "commercialIncharge", "locationIncharge"].map(
                (incharge, index) => (
                  <Form.Group
                    as={Col}
                    md="4"
                    key={index}
                    controlId={`proposal${index}`}
                  >
                    <Form.Check
                      inline
                      name={incharge}
                      label={
                        incharge.charAt(0).toUpperCase() + incharge.slice(1)
                      }
                      type="checkbox"
                      id={`proposalCheckbox${index}`}
                      onChange={(e) => handleChange(e)}
                      checked={surveyForm.sentProposalTo[incharge] || false}
                    />
                  </Form.Group>
                )
              )}
            </Row>

            <Row className="mb-3">
              <h4>Services Required</h4>
              {["serviceOne", "serviceTwo", "serviceThree"].map(
                (service, index) => (
                  <Form.Group
                    as={Col}
                    md="4"
                    key={index}
                    controlId={`service${index}`}
                  >
                    <Form.Check
                      inline
                      name={service} // This should match the state structure
                      label={service.charAt(0).toUpperCase() + service.slice(1)} // Capitalizes the first letter for display
                      type="checkbox"
                      id={`serviceCheckbox${index}`}
                      onChange={(e) => handleChange(e)}
                      checked={surveyForm.servicesRequired[service] || false} // Reflects the state
                    />
                  </Form.Group>
                )
              )}
            </Row>

            <Row className="mb-3">
              <h4>Additional Services</h4>
              {["additionalOne", "additionalTwo", "additionalThree"].map(
                (service, index) => (
                  <Form.Group
                    as={Col}
                    md="4"
                    key={index}
                    controlId={`additionalService${index}`}
                  >
                    <Form.Check
                      inline
                      name={service}
                      label={service.charAt(0).toUpperCase() + service.slice(1)}
                      type="checkbox"
                      onChange={(e) => handleChange(e)}
                      checked={surveyForm.additionalServices[service] || false}
                      id={`additionalServiceCheckbox${index}`}
                    />
                  </Form.Group>
                )
              )}
            </Row>
            <hr></hr>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom07">
                <Form.Label>Type of Premises</Form.Label>
                <Form.Select required>
                  <option>--Select--</option>
                  <option value="1">Premises</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom08">
                <Form.Label>No. of Premises</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="No. of Premises"
                  name="premises"
                  value={surveyForm.premises}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </Row>

            <Button
              type="button"
              onClick={onNextForm}
              className="me-2"
              style={{ float: "right" }}
            >
              Save & Continue
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
//  };

export default Survey;
