import axios from 'axios';
import Button from '../../Components/Buttons/Button';
import Form from '../../Components/Form';
import {useState} from 'react';
import { useEffect } from 'react';

const stepTransitionDelay = 2000; //In milliseconds.
const requestTimeout = 10000;

function cancel(e){
    location.assign('#/login');
}

function EmailForm(props){

    const [error, setError] = useState(-1);
    const [loading, setLoading] = useState(false);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

        axios.post('/api/users/reset/password', {
            step: 0,
            email: e.target.email.value
        })
        .then(res => {
            setError(0);
            props.setEmail(e.target.email.value);

            setTimeout(() => props.setStep(1), stepTransitionDelay);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    return (
        <Form onSubmit={onSubmitHandler} className="animated">
            <Form.Header>Nollaa Salasanasi</Form.Header>
            <Form.Group>
                <Form.Label>Anna Sähköpostiosoitteesi</Form.Label>
                <Form.Control type="email" name="email" required></Form.Control>
                <Form.SubLabel>Lähetämme sinulle nollauskoodin pikapuolin.</Form.SubLabel>
            </Form.Group>

            <Form.ButtonGroup>
                <button className="primary" type="submit" disabled={loading || error === 0}>Lähetä Nollauskoodi</button> 
                <button className="secondary" type="button" onClick={cancel} disabled={loading || error === 0}>Peruuta</button>
            </Form.ButtonGroup>

            {
                loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
            }

            {
                error === 0 ? <Form.Success>Nollauskoodi lähetetty onnistuneesti!</Form.Success>
                :
                error === 404 ? 
                <Form.Error>Tiliä tällä sähköpostiosoitteella ei ole!</Form.Error>
                :
                error === 500 ?
                <Form.Error>Tapahtui odottamaton virhe!</Form.Error>
                :
                <></>
            }
        </Form>
    )
}

function ResetCodeForm({email, setStep}){
    const [error, setError] = useState(-1);
    const [loading, setLoading] = useState(false);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

        axios.post('/api/users/reset/password', {
            step: 1,
            email,
            reset_code: e.target.reset_code.value,
        })
        .then(res => {
            setError(0);

            setTimeout(() => setStep(2), stepTransitionDelay);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    function sendResetCode(e){
        setLoading(true);

        axios.post('/api/users/resend', {
            instruction: 0,
            email,
        })
        .then(res => {
            setError(1);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        //Automatically step back to asking for the email address when a provided code has expired.
        if(error === 410) setTimeout(() => setStep(0), stepTransitionDelay);
    }, [error]);

    return (
        <Form onSubmit={onSubmitHandler} className="animated">
            <Form.Header>Nollaa Salasanasi</Form.Header>
            <Form.Group>
                <Form.Label>Anna Salasanan Nollauskoodi</Form.Label>
                <Form.Control name="reset_code" required></Form.Control>
                <Form.SubLabel>Olemme lähettäneet koodin sähköpostiisi. Etkö saanut sitä? Klikkaa <span style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}} onClick={sendResetCode}>tästä</span></Form.SubLabel>
            </Form.Group>

            <Form.ButtonGroup>
                <button type="submit" className="primary" disabled={loading || error === 0}>Lähetä</button>
                <button type="button" className="secondary" onClick={cancel} disabled={loading || error === 0}>Peruuta</button>
            </Form.ButtonGroup>

            {
                loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
            }
            
            {
                error === 0 ? <Form.Success>Nollauskoodi hyväksytty!</Form.Success>
                :
                error === 1 ? <Form.Success>Nollauskoodi lähetetty! Tarkista sähköpostisi.</Form.Success>
                :
                error === 403 ? <Form.Error>Nollauskoodia ei hyväksytty!</Form.Error>
                :
                error === 410 ? <Form.Error>Nollauskoodi on umpeutunut!</Form.Error> 
                :
                <></>
            }
        </Form>
    );
}

function PasswordForm({setStep, email}){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(-1);
    
    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

        axios.post('/api/users/reset/password', {
            step: 2,
            password1: e.target.password1.value,
            password2: e.target.password2.value,
            email,
        })
        .then(res => {
            setError(0);
            setTimeout(() => location.assign('#/login'), stepTransitionDelay);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    return (
        <Form className="animated" onSubmit={onSubmitHandler}>
            <Form.Header>Nollaa Salasanasi</Form.Header>
            <Form.Group>
                <Form.Label>Anna Uusi Salasana</Form.Label>
                <Form.Control type="password" name="password1" required></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Kirjoita Salasana Vielä Uudelleen</Form.Label>
                <Form.Control type="password" name="password2" required></Form.Control>
            </Form.Group>

            <Form.ButtonGroup>
                <button className="primary" type="submit" disabled={loading || error === 0}>Vaihda Salasana</button>
                <button type="button" className="secondary" onClick={cancel} disabled={loading || error === 0}>Peruuta</button>
            </Form.ButtonGroup>

            {
                loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
            }

            {
                error === 409 ? <Form.Error>Antamasi salasanat eivät täsmää!</Form.Error>
                :
                error === 0 ? <Form.Success>Salasanasi on vaihdettu onnistuneesti!</Form.Success>
                : 
                <></>
            }
        </Form>
    )
}

function ResetPassword(props){

    const [step, setStep] = useState(0) //0 for asking for the email, 1 for asking for the reset code, 2 for new password input.
    const [email, setEmail] = useState(null);

    return (    
        <div id="reset-password-page">
            <div className="bg-blur"></div>
            {
                step === 0 ? <EmailForm setStep={setStep} setEmail={setEmail}/>
                :
                step === 1 ? <ResetCodeForm setStep={setStep} email={email}/>
                :
                step === 2 ? <PasswordForm setStep={setStep} email={email}/>
                :
                null
            }
        </div>
    )
}

export default ResetPassword;