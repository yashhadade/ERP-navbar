import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap';

const AdminPannel = () => {
  const [clientName, setClientName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [clients, setClients] = useState([]);

  // Load clients from localStorage
  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(storedClients);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!clientName || !siteName || !date) {
      setFormError('All fields are required');
      setSuccessMessage('');
      return;
    }

    // Clear error message if all fields are valid
    setFormError('');
    setSuccessMessage(`Client: ${clientName}\nSite: ${siteName}\nDate: ${date}`);

    // Reset form after submission
    setClientName('');
    setSiteName('');
    setDate('');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4 mt-5">Admin Panel</h3>

          {/* Success Message */}
          {successMessage && (
            <Alert variant="success">
              <h5>Form Submitted Successfully!</h5>
              <pre>{successMessage}</pre>
            </Alert>
          )}

          {/* Error Message */}
          {formError && (
            <Alert variant="danger">
              <strong>Error:</strong> {formError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Client Name Dropdown */}
            <Form.Group controlId="clientName" className="mb-3">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                as="select"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                isInvalid={!!formError}
              >
                <option value="">Select Client</option>
                {clients.map((client, index) => (
                  <option key={index} value={client}>{client}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formError && 'Client name is required'}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Site Name */}
            <Form.Group controlId="siteName" className="mb-3">
              <Form.Label>Site Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter site name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                isInvalid={!!formError}
              />
              <Form.Control.Feedback type="invalid">
                {formError && 'Site name is required'}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Date */}
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                isInvalid={!!formError}
              />
              <Form.Control.Feedback type="invalid">
                {formError && 'Date is required'}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100" disabled={!!formError}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPannel;