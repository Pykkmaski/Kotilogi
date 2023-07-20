import axios from 'axios';
import Button from '../Components/Buttons/Button';
import Form from '../Components/Form';
import {useState} from 'react';

function ResetPassword(props){

    const [error, setError] = useState(0);

    function submitHandler(e){
        e.preventDefault();
        console.log('kalja');

        axios.post('/api/reset/password', {
            email: e.target.email.value
        })
        .then(res => {
            setError(0);
        })
        .catch(err => setError(err.response.status));
    }

    console.log(error);
    return (    
        <div id="reset-password-page">
            <Form onSubmit={submitHandler} className="animated">
                <div className="form-title">Nollaa Salasana</div>
                <Form.Group>
                    <Form.Label>Anna sähköpostiosoitteesi</Form.Label>
                    <Form.Control type="email" name="email"></Form.Control>
                </Form.Group>

                <Form.ButtonGroup>
                    <button type="submit" className="primary">Lähetä Nollauskoodi</button>
                </Form.ButtonGroup>

                {
                    error === 404 ? 
                    <Form.Error>Tiliä tällä sähköpostiosoitteella ei ole!</Form.Error>
                    :
                    <></>
                }
            </Form>
        </div>
    )
}

export default ResetPassword;