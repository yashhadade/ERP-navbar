import React, { useState } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';

const AdminPannel = () => {

  const [clientName, setClientName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation: Check if any field is empty
    if (!clientName || !siteName || !date) {
      setFormError('All fields are required');
      return;
    }

    // Reset error message and proceed with form submission
    setFormError('');
    alert(`Client: ${clientName}\nSite: ${siteName}\nDate: ${date}`);

    // Optionally clear form fields after submit
    setClientName('');
    setSiteName('');
    setDate('');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Header as="h5" className="text-center">
              Admin Panel
            </Form.Header>
            <Form.Body>
              {/* Main Form */}
              <Form onSubmit={handleSubmit}>
                {/* Client Name Field */}
                <Form.Group controlId="formClientName">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter client name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    isInvalid={!!formError} // Display error if formError exists
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError && 'Client name is required.'}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Site Name Field */}
                <Form.Group controlId="formSiteName">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter site name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    isInvalid={!!formError} // Display error if formError exists
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError && 'Site name is required.'}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Date Field */}
                <Form.Group controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    isInvalid={!!formError} // Display error if formError exists
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError && 'Date is required.'}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Form.Body>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPannel;
