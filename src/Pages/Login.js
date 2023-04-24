import { useContext, useState, useEffect } from 'react';
import { userStorageName } from '../appconfig';
import AppContext from '../Contexts/AppContext';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/scss/bootstrap.scss';
import LinkTo from '../Functions/LinkTo';

function Login(props){

    const {setToken, setAuthHeader} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    function onSubmitHandler(e){

        e.preventDefault();
        setLoading(true);
        setError(0);

        axios.post('/login', {
            email: e.target.email.value,
            password: e.target.password.value,
        })
        .then(res => {
            const token = res.data.token;
            setToken(token); //Saves the token in local storage
            setAuthHeader(token); //Sets axios default auth header.
            LinkTo('/user')
        })
        .catch(err => {
            setError(err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <Form onSubmit={onSubmitHandler} className="mw-25">
                <header>
                    <h1>Kirjaudu Sisään</h1>
                </header>
                <Form.Group className="w-100">
                    <Form.Label>Sähköpostiosoite</Form.Label>
                    <Form.Control type="email" name="email"></Form.Control>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Salasana</Form.Label>
                    <Form.Control type="password" name="password"></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">Kirjaudu</Button>

                {
                    loading ? <Spinner animation="grow" role="status" variant="primary"></Spinner> : null
                }

                
                <span className="text-danger">
                {
                    error === 404 ?
                    'Tiliä annetulla käyttäjänimellä ei ole!' :
                    error === 401 ?
                    'Annettu salasana on virheellinen!' :
                    null
                }
            </span>
            </Form>

            
        </div>
      
      
    );
}

export default Login;