import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';

const DriverRoom = ({ onPrevious, onNext, currentDriverRoomIndex, numOfDriverRoom, setAllDriverRoomData, allPremisesData }) => {
    const [formData, setFormData] = useState({
        name: "",
        carpetArea: 0,
        flooringType: "Select",
        ceilingHeight: 0,
        addPhoto: null,
        ambiance: "",
        facilitiesProvided: "radio",
        crockery: "radio",
        remarks: "",
        AC: "radio",
    });

    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileUpload = (e) => {
        setFormData(prevData => ({ ...prevData, addPhoto: URL.createObjectURL(e.target.files[0]) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAllDriverRoomData(prevData => {
            const newData = [...prevData];
            newData[currentDriverRoomIndex] = formData; // Save current form data
            return newData;
        });
        console.log("Driver Room Data:", formData);
        onNext(); // Call onNext to navigate to the next form
    };

    return (
        <div>
            <h2 className="form-title" style={{ textAlign: "center" }}>Driver Room Form</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formCarpetArea">
                        <Form.Label>Carpet Area (sq. ft)</Form.Label>
                        <Form.Control
                            type="number"
                            name="carpetArea"
                            value={formData.carpetArea}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formFlooringType">
                        <Form.Label>Flooring Type</Form.Label>
                        <Form.Control as="select" name="flooringType" value={formData.flooringType} onChange={handleInputChange}>
                            <option value="Select">Select</option>
                            <option value="Tile">Tile</option>
                            <option value="Wood">Wood</option>
                            <option value="Carpet">Carpet</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formCeilingHeight">
                        <Form.Label>Ceiling Height (ft)</Form.Label>
                        <Form.Control
                            type="number"
                            name="ceilingHeight"
                            value={formData.ceilingHeight}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formAddPhoto">
                        <Form.Label>Upload Photo</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                        {formData.addPhoto && (
                            <div>
                                <Button variant="link" onClick={() => setShowModal(true)}>View Photo</Button>
                                <img src={formData.addPhoto} alt="Room Thumbnail" style={{ width: "100px", height: "auto", marginTop: "10px" }} />
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formAmbiance">
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
                    <Form.Group as={Col} md="6" controlId="formFacilitiesProvided">
                        <Form.Label>Facilities Provided</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Tea Coffee Machine"
                            name="facilitiesProvided"
                            value="Tea Coffee Machine"
                            checked={formData.facilitiesProvided === "yes"}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Tea Coffee Services"
                            name="facilitiesProvided"
                            value="Tea Coffee Services"
                            checked={formData.facilitiesProvided === "no"}
                            onChange={handleInputChange}
                        />
                         <Form.Check
                            type="radio"
                            label="Tea Coffee Services"
                            name="facilitiesProvided"
                            value="Tea Coffee Services"
                            checked={formData.facilitiesProvided === "no"}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formCrockery">
                        <Form.Label>Crockery Provided</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="crockery"
                            value="yes"
                            checked={formData.crockery === "yes"}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="crockery"
                            value="no"
                            checked={formData.crockery === "no"}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formRemarks">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formAC">
                        <Form.Label>Air Conditioning</Form.Label>
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

                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={onPrevious} disabled={currentDriverRoomIndex === 0}>
                        Previous
                    </Button>
                    <Button variant="primary" type="submit">
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
                        <img src={formData.addPhoto} alt="Room" style={{ width: "100%", height: "auto" }} />
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
