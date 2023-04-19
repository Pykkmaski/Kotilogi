import { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../Contexts/AppContext";
import 'bootstrap/scss/bootstrap.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function AddEvent(props){

    const {user} = useContext(AppContext);
    const {id} = useParams();

    function onSubmitHandler(e){
        e.preventDefault();
        axios.post(`/property/${id}/events`, {
            body : {
                name: e.target.name.value,
                description: e.target.description.value,
                date: e.target.date.value,

            }
        }).then(res => {
            window.location.replace(`/#/property/${id}/repairs`); 
        })
        .catch(err => {
            console.log(err.response.status);
        });
    }

    function cancel(){
        
    }
    return (
        <div className="d-flex flex-column align-items-center">

            <Form onSubmit={onSubmitHandler}>
                <h1>Lisää Uusi Tapahtuma</h1>
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

                <Form.Group className="d-flex flex-row justify-content-between w-100">
                    <Button variant="secondary" onClick={cancel}>Peruuta</Button>
                    <Button type="submit" variant="primary">Lisää</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AddEvent;