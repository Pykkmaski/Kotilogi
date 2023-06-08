import Form from "../../../../Components/Form";

function HeatingFieldset(props){
    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Lämmitysjärjestelmät</Form.Legend>
            <Form.Group>
                <Form.Label>Ensisijainen</Form.Label>
                <Form.Control type="select" name="primary_heating">
                    <Form.Option>Sähkö</Form.Option>
                    <Form.Option>Kaukolämpö</Form.Option>
                    <Form.Option>Maalämpö</Form.Option>
                    <Form.Option>Vesi-Ilma lämpöpumppu</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Toissijainen</Form.Label>
                <Form.Control type="select" name="secondary_heating">
                    <Form.Option>Takka</Form.Option>
                    <Form.Option>Ilmaämpöpumppu</Form.Option>
                </Form.Control>
            </Form.Group>
        </fieldset>
    )
}

export default HeatingFieldset;