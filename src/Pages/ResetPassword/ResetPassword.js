import axios from 'axios';
import Button from '../../Components/Buttons/Button';
import Form from '../../Components/Form';
import {useState} from 'react';

function EmailForm(props){

    const [error, setError] = useState(0);
    const [loading, setLoading] = useState(false);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

        axios.post('/api/reset/password', {
            email: e.target.email.value
        })
        .then(res => {
            setError(0);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <h1>Nollaa Salasana</h1>
            <Form.Group>
                <Form.Label>Anna Sähköpostiosoitteesi</Form.Label>
                <Form.Control type="email" name="email"></Form.Control>
            </Form.Group>

            <Form.ButtonGroup>
                <button className="primary" type="submit">Lähetä Nollauskoodi</button> 
            </Form.ButtonGroup>

            <Form.Spinner visible={loading} size="2rem"></Form.Spinner> 

            {
                error === 404 ? 
                <Form.Error>Tiliä tällä sähköpostiosoitteella ei ole!</Form.Error>
                :
                <></>
            }
        </Form>
    )
}

function ResetCodeForm({email}){
    const [error, setError] = useState(0);
    const [loading, setLoading] = useState(false);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

    }

    return (
        <Form onSubmit={onSubmitHandler} className="animated">
            <Form.Group>
                <Form.Label>Anna Salasanan Nollauskoodi</Form.Label>
                <Form.Control name="reset_code"></Form.Control>
            </Form.Group>

            <Form.ButtonGroup>
                <button type="submit">Lähetä</button>
            </Form.ButtonGroup>
            <Form.Spinner visible={props.loading} size="1rem"></Form.Spinner>
        </Form>
    );
}

function ResetPassword(props){

    const [step, setStep] = useState(0) //0 for asking for the email, 1 for asking for the reset code, 2 for new password input.
    
    return (    
        <div id="reset-password-page">
            {
                step === 0 ? <EmailForm/>
                :
                step === 1 ? <ResetCodeForm/>
                :
                step === 2 ? <PasswordForm/>
                :
                null
            }
        </div>
    )
}

export default ResetPassword;