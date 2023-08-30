import {useState, useEffect} from 'react';
import axios from 'axios';
import Form from '../Components/Form';

function UserActivationForm(props){

    const [error, setError] = useState(-1);
    const [loading, setLoading] = useState(false);

    function cancel(e){
        history.back();
    }

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

        axios.post('/api/users/resend', {
            email: e.target.email.value,
            instruction: 0
        })
        .then(res => {
            setError(0);
            props.setEmail(e.target.email.value);

            setTimeout(() => location.assign('/'), 2000);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    return (
        <Form onSubmit={onSubmitHandler} className="animated">
            <Form.Header>Aktivoi Tilisi</Form.Header>
            <Form.Group>
                <Form.Label>Anna Sähköpostiosoitteesi</Form.Label>
                <Form.Control type="email" name="email" required></Form.Control>
                <Form.SubLabel>Lähetämme sinulle aktivointikoodin pikapuolin.</Form.SubLabel>
            </Form.Group>

            <Form.ButtonGroup>
                <button className="primary" type="submit" disabled={loading || error === 0}>Lähetä Nollauskoodi</button> 
                <button className="secondary" type="button" onClick={cancel} disabled={loading || error === 0}>Peruuta</button>
            </Form.ButtonGroup>

            {
                loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
            }

            {
                error === 0 ? <Form.Success>Aktivointikoodi lähetetty onnistuneesti!</Form.Success>
                :
                error === 400 ? <Form.Error>Aktivointikoodia ei voida lähettää! Tarkista että olet kirjoittanut sähköpostisi oikein.</Form.Error>
                :
                error === 404 ? 
                <Form.Error>Tiliä tällä sähköpostiosoitteella ei ole!</Form.Error>
                :
                error === 409 ?
                <Form.Error>Tili tällä sähköpostiosoitteella on jo aktivoitu!</Form.Error>
                :
                error === 500 ?
                <Form.Error>Tapahtui odottamaton virhe!</Form.Error>
                :
                <></>
            }
        </Form>
    )
}

function SendActivationCode(props){
    return(
        <div id="send-activation-code-page">
            <div className="bg-blur"></div>
            <UserActivationForm/>
        </div>
    );
}

export default SendActivationCode;