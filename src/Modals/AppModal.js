import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AppModal(props){

    //if(!props.setShowModal) throw new Error('Modal setShow function missing!');

    if(props.variant === 'upload/image'){
        //if(!props.uploadFuntion) throw new Error('Upload modal upload function missing!');

        return (
            <Modal show={props.showModal} centered onHide={() => props.setShowModal(false)}>
                <Modal.Header closeButton>
                    Lataa Kuva
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={props.uploadFunction}>
                        <Form.Group className="w-100">
                            <Form.Control type="file" accept="image/jpeg" name="image"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100 d-flex flex-row justify-content-between gap-1">
                            <Button variant="secondary" onClick={() => props.setShowModal(false)}>Peruuta</Button>
                            <Button variant="primary" type="submit">Lähetä</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
    else if(props.variant === 'upload/pdf'){
        //if(!props.uploadFuntion) throw new Error('Upload modal upload function missing!');

        return (
            <Modal show={props.showModal} centered onHide={() => props.setShowModal(false)}>
                <Modal.Header closeButton>
                    Lataa PDF
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={props.uploadFunction}>
                        <Form.Group className="w-100">
                            <Form.Control type="file" accept="application/pdf" name="pdf"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100 d-flex flex-row justify-content-between gap-1">
                            <Button variant="secondary" onClick={() => props.setShowModal(false)}>Peruuta</Button>
                            <Button variant="primary" type="submit">Lähetä</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
    else if(props.variant === 'upload/event'){
        //if(!props.uploadFuntion) throw new Error('Upload modal upload function missing!');

        return (
            <Modal show={props.showModal} backdrop="static" centered onHide={() => props.setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Lisää Tapahtuma</Modal.Title>
                    
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={props.uploadFunction}>
                        <Form.Group className="w-100">
                            <Form.Label>Otsikko</Form.Label>
                            <Form.Control name="name" required></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Päivämäärä</Form.Label>
                            <Form.Control name="date" type="date" required></Form.Control>
                        </Form.Group>
                        
                        <Form.Group className="w-100">
                            <Form.Label>Kuvaus</Form.Label>
                            <Form.Control as="textarea" name="description"></Form.Control>
                        </Form.Group>

                        <Form.Group className="d-flex flex-row justify-content-between w-100 gap-1">
                            <Button variant="secondary" onClick={() => props.setShowModal(false)}>Peruuta</Button>
                            <Button type="submit" variant="primary">Lisää</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
    else if(props.variant === 'upload/property'){
        return (
            <Modal centered onHide={() => props.setShowModal(false)} show={props.showModal}>
                <Modal.Header closeButton>Lisää Uusi Talo</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={props.uploadFunction}>
                        <Form.Group className="w-100">
                            <Form.Label>Osoite</Form.Label>
                            <Form.Control name="address" required></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Lämmitystyypi</Form.Label>
                            <Form.Select name="heating_type" required>
                                <option value="kaukolämpö">Kaukolämpö</option>
                                <option value="maalämpö">Maalämpö</option>
                                <option value="sähkö">Sähkö</option>
                                <option value="öljy">Öljy</option>
                                <option value="ilma-lämpöpumppu">Ilma-lämpöpumppu</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Tontin omistuksen tyyppi</Form.Label>
                            <Form.Select name="yard_ownership" required>
                                <option value="vuokra">Vuokra</option>
                                <option value="oma">Oma</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Talon tyyppi</Form.Label>
                            <Form.Select name="property_type" required>
                                <option value="rintamamiestalo">Rintamamiestalo</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Rakennusvuosi</Form.Label>
                            <Form.Control name="build_year" required type="number" min="1" step="1"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Tontin neliömäärä</Form.Label>
                            <Form.Control name="yard_area" required type="number" step="0.01" min="0"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Talon neliömäärä</Form.Label>
                            <Form.Control name="area" required type="number" step="0.01" min="0"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Kerrosten lukumäärä</Form.Label>
                            <Form.Control name="floor_count" required type="number" step="1" min="1"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Vessojen lukumäärä</Form.Label>
                            <Form.Control name="wc_count" required type="number" step="1" min="1"></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Huoneiden lukumäärä</Form.Label>
                            <Form.Control name="room_count" required type="number" step="1" min="1"></Form.Control>
                        </Form.Group>

                        <Form.Group className="d-flex flex-row justify-content-between w-100 gap-1">
                            <Button variant="secondary" onClick={() => props.setShowModal(false)}>Peruuta</Button>
                            <Button type="submit" variant="primary">Lisää</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
    else if(props.variant === 'show/image'){
        return(
            <Modal centered onHide={() => props.setShowModal(false)} show={props.showModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img className="big-image" src={`/images/property/${props.property_id}/${props.selectedImageId}`}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.setSelectedImageAsMain()}>Aseta Pääkuvaksi</Button>
                    <Button variant="secondary" onClick={() => props.setShowModal(false)}>Sulje</Button>
                    <Button variant="danger" onClick={() => props.deleteSelectedImage()}>Poista</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    else if(props.variant === 'show/pdf'){
        return null;
    }
    else if(props.variant === 'delete/event'){
        return (
            <Modal show={props.showModal} backdrop="static" centered onHide={() => props.setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Poista Tapahtuma</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Oletko varma että haluat poistaa tämän tapahtuman?
                </Modal.Body>

                <Modal.Footer>
                    <Button style={{width: "100px"}} variant="primary" onClick={() => props.setShowModal(false)}>Ei</Button>
                    <Button style={{width: "100px"}}variant="secondary" onClick={() => props.deleteFunction(props.eventToBeDeleted)}>Kyllä</Button>
                </Modal.Footer>
            </Modal>
        )
    }
    else{
        return null;
    }
}

export default AppModal;