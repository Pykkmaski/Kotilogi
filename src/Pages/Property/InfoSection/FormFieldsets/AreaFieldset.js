import Form from '../../../../Components/Form';

function AreaFieldset(props){
    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Asunnon pinta-alat</Form.Legend>
            <Form.Group>
                <Form.Label>Asuintilojen pinta-ala</Form.Label>
                <Form.Control type="number" name="living_area"></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Muut tilat</Form.Label>
                <Form.Control type="number" name="other_area"></Form.Control>
            </Form.Group>
        </fieldset>
    )
}

export default AreaFieldset;