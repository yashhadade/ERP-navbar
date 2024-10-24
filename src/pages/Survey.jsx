import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
function Survey() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Client Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Client Name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Site name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Site name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Business Category:</Form.Label>
          <Form.Select>
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Select>
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Select>
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Site Address:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Site Address:"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Geo Location:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="latitude, longitude
"
          />
        </Form.Group>
      </Row>
      <hr></hr>
      <Row className="mb-3">
        <h2>Site Incharge</h2>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            type="Text"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            required
            type="Text"
            placeholder="Phone"
            minLength={10}
            maxLength={10}
          />
        </Form.Group>
        </Row>
        <hr></hr>
        <Row className="mb-3">
        <h2>Commercial Incharge</h2>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone"
            minLength={10}
            maxLength={10}
          />
        </Form.Group>
        </Row>
        <hr></hr>
      <Row className="mb-3">
        <h2>Location Incharge</h2>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            type="Text"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            required
            type="Text"
            placeholder="Phone"
            minLength={10}
            maxLength={10}
          />
        </Form.Group>
        </Row>
        <hr></hr>
        <Row className="mb-3">
        <h2>Referal</h2>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone"
            minLength={10}
            maxLength={10}
          />
        </Form.Group>
        </Row>
       
        <hr></hr>
        <Row className="mb-3">
        <h2>Sent Proposal To</h2>
        <Form.Group as={Col} md="4" controlId="validationCustom01">

          <Form.Check
            inline
            label="Site Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-1"
           />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          
        <Form.Check
            inline
            label="Commercial Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-2"
           />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Check
            inline
            label="Location Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-3"
           />
        </Form.Group>
        </Row>
        <hr></hr>
        <Row className="mb-3">
        <h2>Services required</h2>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Check
            inline
            label="Site Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-1"
           />
           <Form.Check
            inline
            label="Site Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-1"
           />
           <Form.Check
            inline
            label="Site Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-1"
           />
        </Form.Group>
        </Row>
        
        <Row className="mb-3">
        <h2>Additional services</h2>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Check
            inline
            label="Site Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-1"
           />
           <Form.Check
            inline
            label="Site Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-1"
           />
           <Form.Check
            inline
            label="Site Incharge"
            name="group1"
            type="checkbox"
            id="inline-checkbox-1"
           />
        </Form.Group>
        </Row>
        <hr></hr>
      
      <Button type="submit">Submit form</Button>
    </Form>
  )
}
export default Survey;