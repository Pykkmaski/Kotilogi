import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/scss/bootstrap.scss';

function Signup(props){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);
        setError(0);

        axios.post('/signup', {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password1: e.target.password1.value,
            password2: e.target.password2.value,
        })
        .then(res => {
            location.assign('/#/thankyou');
        })
        .catch(err => {
            setError(err.response.status);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Form onSubmit={onSubmitHandler}>
                <header>
                    <h1>Luo Käyttäjätunnus</h1>
                </header>
                <Form.Group className="w-100">
                    <Form.Label>Etunimi</Form.Label>
                    <Form.Control type="text" required name="first_name"></Form.Control>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Sukunimi</Form.Label>
                    <Form.Control type="text" required name="last_name"></Form.Control>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Sähköposti</Form.Label>
                    <Form.Control type="text" required name="email"></Form.Control>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Salasana</Form.Label>
                    <Form.Control type="password" required name="password1" minLength={8} controlId="formBasicPassword"></Form.Control>
                    <Form.Text>Salasanan tulee olla vähintään 8 merkkiä pitkä.</Form.Text>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Anna Salasana Uudelleen</Form.Label>
                    <Form.Control type="password" required name="password2"></Form.Control>
                </Form.Group>

                <Button variant="primary" size="lg" type="submit">Luo Tili</Button>

                {
                    loading ? <Spinner role="status" animation="grow"></Spinner> : null
                }

                <span className="text-danger">
                    {
                        error === 409 ? 
                        "Annetut salasanat eivät täsmää!" :
                        error === 406 ?
                        "Tili annetulla käyttäjänimellä on jo olemassa!" :
                        null
                    }
                </span>
            </Form>
        </div>
    )
}

export default Signup;