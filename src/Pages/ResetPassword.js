import Button from '../Components/Buttons/Button';
import Form from '../Components/Form';

function ResetPassword(props){

    function submitHandler(e){
        e.preventDefault();
    }

    return (
        <div id="reset-password-page">
            <Form onSubmit={submitHandler} className="animated">
                <div className="form-title">Nollaa Salasana</div>
                <Form.Group>
                    <Form.Label>Anna sähköpostiosoitteesi</Form.Label>
                    <Form.Control type="email"></Form.Control>
                    <Form.SubLabel>Huom! Tämä toiminto ei ole vielä valmis.</Form.SubLabel>
                </Form.Group>

                <Form.ButtonGroup>
                    <Button type="submit" className="primary">Nollaa Salasana</Button>
                </Form.ButtonGroup>
            </Form>
        </div>
    )
}

export default ResetPassword;