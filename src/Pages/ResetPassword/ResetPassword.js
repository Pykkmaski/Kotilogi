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

        axios.post('/api/users/reset/password', {
            email: e.target.email.value
        })
        .then(res => {
            console.log('kalja');
            setError(0);
            props.setEmail(e.target.email.value);
            props.setStep(1);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <Form.Label>Anna Sähköpostiosoitteesi</Form.Label>
                <Form.Control type="email" name="email"></Form.Control>
            </Form.Group>

            <Form.ButtonGroup>
                <button className="primary" type="submit">Lähetä Nollauskoodi</button> 
            </Form.ButtonGroup>

            {
                loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
            }

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

        axios.post('/api/users/reset/password/code', {
            email,
            reset_code: e.target.reset_code.value,
        })
        .then(res => {
            setError(0);
            setStep(2);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
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

            {
                loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
            }
            
            {
                error === 403 ? <Form.Error>Nollauskoodia ei hyväksytty!</Form.Error>
                :
                <></>
            }
        </Form>
    );
}

function ResetPassword(props){

    const [step, setStep] = useState(0) //0 for asking for the email, 1 for asking for the reset code, 2 for new password input.
    const [email, setEmail] = useState(null);

    return (    
        <div id="reset-password-page">
            <h1>Nollaa Salasana</h1>
            {
                step === 0 ? <EmailForm setStep={setStep} setEmail={setEmail}/>
                :
                step === 1 ? <ResetCodeForm setStep={setStep} email={email}/>
                :
                step === 2 ? <PasswordForm setStep={setStep}/>
                :
                null
            }
        </div>
    )
}

export default ResetPassword;