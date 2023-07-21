import axios from 'axios';
import Button from '../../Components/Buttons/Button';
import Form from '../../Components/Form';
import {useState} from 'react';

function EmailForm(props){

    function onSubmitHandler(e){
        e.preventDefault();

        axios.post('/api/reset/password', {
            email: e.target.email.value
        })
        .then(res => {
            props.setError(0);
        })
        .catch(err => props.setError(err.response.status));
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

            {
                props.error === 404 ? 
                <Form.Error>Tiliä tällä sähköpostiosoitteella ei ole!</Form.Error>
                :
                <></>
            }
        </Form>
    )
}
function ResetPassword(props){

    const [error, setError] = useState(0);
    const [step, setStep] = useState(0) //0 for asking for the email, 1 for asking for the reset code, 2 for new password input.
    
    console.log(error);
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