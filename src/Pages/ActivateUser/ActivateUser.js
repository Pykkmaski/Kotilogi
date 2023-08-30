import axios from 'axios';
import { useContext, useState } from 'react';
import Form from '../../Components/Form';
import AppContext from '../../Contexts/AppContext';

function ActivateUser(props){

    const {user, setUser} = useContext(AppContext);
    const [error, setError] = useState(-1);
    const [loading, setLoading] = useState(false);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);
        setError(-1);
        
        axios.post('/api/users/activate', {
            activationCode: e.target.activation_code.value,
            email: user.email,
        })
        .then(res => {
            setError(0);
            const newUser = res.data;
            setTimeout(() => {
                setUser(newUser);
            }, 2000);
        })
        .catch(err => setError(err.response.status))
        .finally(() => setLoading(false));
    }

    return (
        <div id="activate-user-page">
            <div className="bg-blur"></div>
            <Form className="animated" onSubmit={onSubmitHandler}>
                <Form.Header>Anna Tilisi Aktivointikoodi</Form.Header>
                <Form.Group>
                    <Form.Label>Aktivointikoodi</Form.Label>
                    <Form.Control name="activation_code" required></Form.Control>
                    <Form.SubLabel>Koodi on lähetetty sähköpostiisi. Etkö saanut sitä? Klikkaa <a href="/send/activationcode">tästä</a></Form.SubLabel>
                </Form.Group>

                <Form.ButtonGroup>
                    <button type="submit" className="primary" disabled={error === 0 || loading}>Aktivoi</button>
                </Form.ButtonGroup>

                {
                    loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
                }

                {
                    error === 0 ? <Form.Success>Aktivointikoodi hyväksytty!</Form.Success>
                    :
                    error === 403 ? <Form.Error>Aktivointikoodia ei hyväksytty!</Form.Error>
                    :
                    error === 410 ? <Form.Error>Aktivointikoodi on umpeutunut! Aikaisemmin luomasi tili on poistettu. Ole hyvä ja <a href="/#/register">Luo uusi tili</a></Form.Error>
                    :
                    <></>
                }
            </Form>
        </div>
    )
}

export default ActivateUser;