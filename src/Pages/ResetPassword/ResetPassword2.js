import axios from "axios";
import Form from "../../Components/Form";

export function ResetPassword2(props){

    function onSubmitHandler(e){
        e.preventDefault();
        axios.get('/api/auth/reset/password')
        .then(() => {
            location.assign('/');
        })
        .catch(err => console.log(err.response));
    }

    return (
        <div id="reset-password-page">
            <Form onSubmit={onSubmitHandler}>
                <Form.Group>
                    <Form.Label>Anna Sähköpostiosoitteesi</Form.Label>
                    <Form.Control type="email" name="email"></Form.Control>
                </Form.Group>

                <Form.ButtonGroup>
                    <button className="primary" type="submit">Lähetä Nollauskoodi</button>
                    <button className="secondary" type="button">Peruuta</button>
                </Form.ButtonGroup>
            </Form>
        </div>
    );
}