import axios from 'axios';
import { useContext, useState } from 'react';
import Form from '../../Components/Form';
import AppContext from '../../Contexts/AppContext';

function ActivateUser(props){

    const {user} = useContext(AppContext);
    const [error, setError] = useState(-1);
    const [loading, setLoading] = useState(false);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);
        console.log(user.email);
        axios.post('/api/users/activate', {
            activationCode: e.target.activation_code.value,
            email: user.email,
        })
        .then(res => {
            setError(0);
            setTimeout(() => location.assign('/'), 2000);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    return (
        <div id="activate-user-page">
            <Form className="animated" onSubmit={onSubmitHandler}>
                <Form.Header>Anna Tilisi Aktivointikoodi</Form.Header>
                <Form.Group>
                    <Form.Label>Aktivointikoodi</Form.Label>
                    <Form.Control name="activation_code"></Form.Control>
                    <Form.SubLabel>Koodi on lähetetty sähköpostiisi. Etkö saanut sitä? Klikkaa <a href="#">tästä</a></Form.SubLabel>
                </Form.Group>

                <Form.ButtonGroup>
                    <button type="submit" className="primary">Aktivoi</button>
                </Form.ButtonGroup>

                {
                    loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
                }

                {
                    error === 0 ? <Form.Success>Aktivointikoodi hyväksytty!</Form.Success>
                    :
                    error === 403 ? <Form.Error>Aktivointikoodia ei hyväksytty!</Form.Error>
                    :
                    error === 410 ? <Form.Error>Aktivointikoodi on umpeutunut! Ole hyvä ja luo uusi tili.</Form.Error>
                    :
                    <></>
                }
            </Form>
        </div>
    )
}

export default ActivateUser;