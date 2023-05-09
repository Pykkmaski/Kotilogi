import {default as CustomModal} from '../Components/Modal';
import {default as CustomForm} from '../Components/Form';

function AppModal(props){

    //if(!props.setShowModal) throw new Error('CustomModal setShow function missing!');

    if(props.variant === 'upload/image'){
        //if(!props.uploadFuntion) throw new Error('Upload modal upload function missing!');

        return (
            <CustomModal show={props.showModal} centered onHide={() => props.setShowModal(false)}>
                <CustomModal.Header closeButton>
                    Lataa Kuva
                </CustomModal.Header>

                <CustomModal.Body>
                    <CustomForm onSubmit={props.uploadFunction}>
                        <CustomForm.Group className="w-100">
                            <CustomForm.Control type="file" accept="image/jpeg" name="image"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.ButtonGroup>
                            <button className="secondary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                            <button className="primary" type="submit">Lähetä</button>
                        </CustomForm.ButtonGroup>
                    </CustomForm>
                </CustomModal.Body>
            </CustomModal>
        );
    }
    else if(props.variant === 'upload/pdf'){
        //if(!props.uploadFuntion) throw new Error('Upload modal upload function missing!');

        return (
            <CustomModal show={props.showModal} centered onHide={() => props.setShowModal(false)}>
                <CustomModal.Header closeButton>
                    Lataa PDF
                </CustomModal.Header>

                <CustomModal.Body>
                    <CustomForm onSubmit={props.uploadFunction}>
                        <CustomForm.Group className="w-100">
                            <CustomForm.Control type="file" accept="application/pdf" name="pdf"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100 d-flex flex-row justify-content-between gap-1">
                            <button className="secondary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                            <button className="primary" type="submit">Lähetä</button>
                        </CustomForm.Group>
                    </CustomForm>
                </CustomModal.Body>
            </CustomModal>
        );
    }
    else if(props.variant === 'upload/event'){
        //if(!props.uploadFuntion) throw new Error('Upload modal upload function missing!');

        return (
            <CustomModal show={props.showModal} backdrop="static" centered onHide={() => props.setShowModal(false)}>
                <CustomModal.Header closeButton>
                    <CustomModal.Title>Lisää Tapahtuma</CustomModal.Title>
                    
                </CustomModal.Header>

                <CustomModal.Body>
                    <CustomForm onSubmit={props.uploadFunction}>
                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Otsikko</CustomForm.Label>
                            <CustomForm.Control name="name" required></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Päivämäärä</CustomForm.Label>
                            <CustomForm.Control name="date" type="date" required></CustomForm.Control>
                        </CustomForm.Group>
                        
                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Kuvaus</CustomForm.Label>
                            <CustomForm.Control as="textarea" name="description"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="d-flex flex-row justify-content-between w-100 gap-1">
                            <button className="secondary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                            <button type="submit" className="primary">Lisää</button>
                        </CustomForm.Group>
                    </CustomForm>
                </CustomModal.Body>
            </CustomModal>
        );
    }
    else if(props.variant === 'upload/property'){
        return (
            <CustomModal centered onHide={() => props.setShowModal(false)} show={props.showModal}>
                <CustomModal.Header closeButton>Lisää Uusi Talo</CustomModal.Header>
                <CustomModal.Body>
                    <CustomForm onSubmit={props.uploadFunction}>
                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Osoite</CustomForm.Label>
                            <CustomForm.Control name="address" required></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Lämmitystyypi</CustomForm.Label>
                            <CustomForm.Select name="heating_type" required>
                                <option value="kaukolämpö">Kaukolämpö</option>
                                <option value="maalämpö">Maalämpö</option>
                                <option value="sähkö">Sähkö</option>
                                <option value="öljy">Öljy</option>
                                <option value="ilma-lämpöpumppu">Ilma-lämpöpumppu</option>
                            </CustomForm.Select>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Tontin omistuksen tyyppi</CustomForm.Label>
                            <CustomForm.Select name="yard_ownership" required>
                                <option value="vuokra">Vuokra</option>
                                <option value="oma">Oma</option>
                            </CustomForm.Select>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Talon tyyppi</CustomForm.Label>
                            <CustomForm.Select name="property_type" required>
                                <option value="rintamamiestalo">Rintamamiestalo</option>
                            </CustomForm.Select>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Rakennusvuosi</CustomForm.Label>
                            <CustomForm.Control name="build_year" required type="number" min="1" step="1"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Tontin neliömäärä</CustomForm.Label>
                            <CustomForm.Control name="yard_area" required type="number" step="0.01" min="0"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Talon neliömäärä</CustomForm.Label>
                            <CustomForm.Control name="area" required type="number" step="0.01" min="0"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Kerrosten lukumäärä</CustomForm.Label>
                            <CustomForm.Control name="floor_count" required type="number" step="1" min="1"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Vessojen lukumäärä</CustomForm.Label>
                            <CustomForm.Control name="wc_count" required type="number" step="1" min="1"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Huoneiden lukumäärä</CustomForm.Label>
                            <CustomForm.Control name="room_count" required type="number" step="1" min="1"></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="d-flex flex-row justify-content-between w-100 gap-1">
                            <button className="secondary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                            <button type="submit" className="primary">Lisää</button>
                        </CustomForm.Group>
                    </CustomForm>
                </CustomModal.Body>
            </CustomModal>
        )
    }
    else if(props.variant === 'update/event'){

        return(
            <CustomModal show={props.showModal} backdrop="static" centered onHide={() => props.setShowModal(false)}>
            <CustomModal.Header closeButton>
                <CustomModal.Title>Muokkaa Tapahtumaa</CustomModal.Title>
            </CustomModal.Header>

            <CustomModal.Body>
                <CustomForm onSubmit={props.uploadFunction}>
                    <CustomForm.Group className="w-100">
                        <CustomForm.Label>Otsikko</CustomForm.Label>
                        <CustomForm.Control name="name" required defaultValue={props.event.name}></CustomForm.Control>
                    </CustomForm.Group>

                    <CustomForm.Group className="w-100">
                        <CustomForm.Label>Päivämäärä</CustomForm.Label>
                        <CustomForm.Control name="date" type="date" required defaultValue={props.event.date}></CustomForm.Control>
                    </CustomForm.Group>
                    
                    <CustomForm.Group className="w-100">
                        <CustomForm.Label>Kuvaus</CustomForm.Label>
                        <CustomForm.Control as="textarea" name="description" defaultValue={props.event.description}></CustomForm.Control>
                    </CustomForm.Group>

                    <CustomForm.ButtonGroup className="d-flex flex-row justify-content-between w-100 gap-1">
                        <button className="secondary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                        <button type="submit" className="primary">Päivitä</button>
                    </CustomForm.ButtonGroup>
                </CustomForm>
            </CustomModal.Body>
        </CustomModal>
        )

    }
    else if(props.variant === 'update/property'){
        return (
            <CustomModal centered onHide={() => props.setShowModal(false)} show={props.showModal}>
                <CustomModal.Header closeButton>Muokkaa Taloa</CustomModal.Header>
                <CustomModal.Body>
                    <CustomForm onSubmit={props.uploadFunction}>
                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Osoite</CustomForm.Label>
                            <CustomForm.Control name="address" required defaultValue={property.address}></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Lämmitystyypi</CustomForm.Label>
                            <CustomForm.Select name="heating_type" required defaultValue={property.heating_type}>
                                <option value="kaukolämpö">Kaukolämpö</option>
                                <option value="maalämpö">Maalämpö</option>
                                <option value="sähkö">Sähkö</option>
                                <option value="öljy">Öljy</option>
                                <option value="ilma-lämpöpumppu">Ilma-lämpöpumppu</option>
                            </CustomForm.Select>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Tontin omistuksen tyyppi</CustomForm.Label>
                            <CustomForm.Select name="yard_ownership" required defaultValue={property.yard_ownership}>
                                <option value="vuokra">Vuokra</option>
                                <option value="oma">Oma</option>
                            </CustomForm.Select>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Talon tyyppi</CustomForm.Label>
                            <CustomForm.Select name="property_type" required defaultValue={property.type}>
                                <option value="rintamamiestalo">Rintamamiestalo</option>
                            </CustomForm.Select>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Rakennusvuosi</CustomForm.Label>
                            <CustomForm.Control name="build_year" required type="number" min="1" step="1" defaultValue={property.build_year}></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Tontin neliömäärä</CustomForm.Label>
                            <CustomForm.Control name="yard_area" required type="number" step="0.01" min="0" defaultValue={property.yard_area}></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Talon neliömäärä</CustomForm.Label>
                            <CustomForm.Control name="area" required type="number" step="0.01" min="0" defaultValue={property.area}></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Kerrosten lukumäärä</CustomForm.Label>
                            <CustomForm.Control name="floor_count" required type="number" step="1" min="1" defaultValue={property.floor_count}></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Vessojen lukumäärä</CustomForm.Label>
                            <CustomForm.Control name="wc_count" required type="number" step="1" min="1" defaultValue={property.wc_count}></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="w-100">
                            <CustomForm.Label>Huoneiden lukumäärä</CustomForm.Label>
                            <CustomForm.Control name="room_count" required type="number" step="1" min="1" defaultValue={property.room_count}></CustomForm.Control>
                        </CustomForm.Group>

                        <CustomForm.Group className="d-flex flex-row justify-content-between w-100 gap-1">
                            <button className="secondary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                            <button type="submit" className="primary">Lisää</button>
                        </CustomForm.Group>
                    </CustomForm>
                </CustomModal.Body>
            </CustomModal>
        )
    }
    else if(props.variant === 'show/image'){
        return(
            <CustomModal centered onHide={() => props.setShowModal(false)} show={props.showModal}>
                <CustomModal.Header closeButton></CustomModal.Header>
                <CustomModal.Body>
                    <img className="big-image" src={props.imageUrl}/>
                </CustomModal.Body>
                <CustomModal.Footer>
                    <button className="primary" onClick={props.setImageAsMain}>Aseta Pääkuvaksi</button>
                    <button className="secondary" onClick={() => props.setShowModal(false)}>Sulje</button>
                    <button className="danger" onClick={() => props.deleteSelectedImage()}>Poista</button>
                </CustomModal.Footer>
            </CustomModal>
        );
    }
    else if(props.variant === 'show/pdf'){
        return null;
    }
    else if(props.variant === 'delete/event'){
        return (
            <CustomModal show={props.showModal} backdrop="static" centered onHide={() => props.setShowModal(false)}>
                <CustomModal.Header closeButton>
                    <CustomModal.Title>Poista Tapahtuma</CustomModal.Title>
                </CustomModal.Header>

                <CustomModal.Body>
                    Oletko varma että haluat poistaa tämän tapahtuman?
                </CustomModal.Body>

                <CustomModal.Footer>
                    <button style={{width: "100px"}} className="primary" onClick={() => props.setShowModal(false)}>Ei</button>
                    <button style={{width: "100px"}}className="secondary" onClick={() => props.deleteFunction(props.eventToBeDeleted)}>Kyllä</button>
                </CustomModal.Footer>
            </CustomModal>
        )
    }
    else{
        return null;
    }
}

export default AppModal;