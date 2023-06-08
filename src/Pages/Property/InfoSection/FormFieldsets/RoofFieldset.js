import Form from '../../../../Components/Form';

function RoofFieldset(props){
    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Katto</Form.Legend>
            <Form.Group>
                <Form.Label>Katto</Form.Label>
                <Form.Control type="select" name="roof_type">
                    <Form.Option value="">Harjakate</Form.Option>
                    <Form.Option value="">Tasakatto</Form.Option>
                    <Form.Option value="">Pulpetti</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Katon materiaali</Form.Label>
                <Form.Control type="select" name="roof_material">
                    <Form.Option value="pelti">Pelti</Form.Option>
                    <Form.Option value="tiili">Tiili</Form.Option>
                    <Form.Option value="huopa">Huopa</Form.Option>
                </Form.Control>
            </Form.Group>
        </fieldset>
    );
}

export default RoofFieldset;