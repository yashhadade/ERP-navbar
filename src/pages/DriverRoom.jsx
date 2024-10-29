import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';

const DriverRoom = ({ onPrevious, onNext, currentDriverRoomIndex, setAllDriverRoomData }) => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        carpetArea: '',
        flooringType: "Tile",
        ceilingHeight: '',
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
        AC: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                facilitiesProvided: {
                    ...prevData.facilitiesProvided,
                    [name]: checked,
                },
            }));
        } else {
            setFormData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleFileUpload = (e) => {
        setFormData(prevData => ({ ...prevData, addPhoto: URL.createObjectURL(e.target.files[0]) }));
    };

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

        setAllDriverRoomData(prevData => {
            const newData = [...prevData];
            newData[currentDriverRoomIndex] = formData; 
            return newData;
        });
        console.log("Driver Room Data:", formData);
        onNext();
    };

    return (
        <div>
            <h2 className="form-title" style={{ textAlign: "center" }}>Driver Room Form</h2>
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
                        <Form.Control as="select" name="flooringType" value={formData.flooringType} onChange={handleInputChange}>
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
                                <img src={formData.addPhoto} alt="Room Thumbnail" style={{ width: "100px", height: "auto", marginTop: "10px" }} />
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
                    <Form.Group as={Col} md="4" controlId="driverRoomFormFacilitiesProvided">
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
                    <Button variant="secondary" onClick={onPrevious} disabled={currentDriverRoomIndex === 0}>
                        Previous
                    </Button>
                    <Button variant="secondary" type="submit">
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
