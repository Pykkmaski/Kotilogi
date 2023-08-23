import { useContext } from 'react';
import Form from '../../../../Components/Form';
import PropertyContext from '../../../../Contexts/PropertyContext';

function YardFieldset(props){

    const {property} = useContext(PropertyContext);
    
    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Tontti</Form.Legend>
            <Form.Group>
                <Form.Label>Tontin omistus</Form.Label>
                <Form.Control name="yard_ownership" type="select">
                    <Form.Option value="oma" selected={property.yard_ownership === 'oma'}>Oma</Form.Option>
                    <Form.Option value="vuokra" selected={property.yard_ownership === 'vuokra'}>Vuokra</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Pinta-ala (m<sup>2</sup>)</Form.Label>
                <Form.Control type="number" name="yard_area" min={0.01} step={0.01} defaultValue={property.yard_area}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Rakennusoikeus</Form.Label>
                <Form.Control name="build_permission" defaultValue={property.build_permission}></Form.Control>
            </Form.Group>
        </fieldset>
    )
}

export default YardFieldset;