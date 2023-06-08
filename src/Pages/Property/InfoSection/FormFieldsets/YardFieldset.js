import Form from '../../../../Components/Form';

function YardFieldset(props){
    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Tontti</Form.Legend>
            <Form.Group>
                <Form.Label>Tontin omistus</Form.Label>
                <Form.Control type="select">
                    <Form.Option value="oma">Oma</Form.Option>
                    <Form.Option value="vuokra">Vuokra</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Pinta-ala</Form.Label>
                <Form.Control type="number" name="yard_area" min={0.01} step={0.01}></Form.Control>
            </Form.Group>
        </fieldset>
    )
}

export default YardFieldset;