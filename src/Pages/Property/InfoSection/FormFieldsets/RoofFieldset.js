import Form from '../../../../Components/Form';
import {useContext} from 'react';
import PropertyContext from '../../../../Contexts/PropertyContext';

function RoofFieldset(props){

    const {property} = useContext(PropertyContext);

    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Katto</Form.Legend>
            <Form.Group>
                <Form.Label>Katto</Form.Label>
                <Form.Control type="select" name="roof_type">
                    <Form.Option value="harjakate" selected={property.roof_type === 'harjakate'}>Harjakate</Form.Option>
                    <Form.Option value="tasakatto" selected={property.roof_type === 'tasakatto'}>Tasakatto</Form.Option>
                    <Form.Option value="pulpetti" selected={property.roof_type === 'pulpetti'}>Pulpetti</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Katon materiaali</Form.Label>
                <Form.Control type="select" name="roof_material">
                    <Form.Option value="pelti" selected={property.roof_material === 'pelti'}>Pelti</Form.Option>
                    <Form.Option value="tiili" selected={property.roof_material === 'tiili'}>Tiili</Form.Option>
                    <Form.Option value="huopa" selected={property.roof_material === 'huopa'}>Huopa</Form.Option>
                </Form.Control>
            </Form.Group>
        </fieldset>
    );
}

export default RoofFieldset;