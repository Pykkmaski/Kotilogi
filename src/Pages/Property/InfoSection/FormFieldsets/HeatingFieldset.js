import Form from "../../../../Components/Form";
import {useContext} from 'react';
import PropertyContext from "../../../../Contexts/PropertyContext";

function HeatingFieldset(props){

    const {property} = useContext(PropertyContext);
    
    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Lämmitysjärjestelmät</Form.Legend>
            <Form.Group>
                <Form.Label>Ensisijainen</Form.Label>
                <Form.Control type="select" name="primary_heating_system">
                    <Form.Option value="sahko" selected={property.primary_heating_system === 'sahko'}>Sähkö</Form.Option>
                    <Form.Option value="kaukolampo" selected={property.primary_heating_system === 'kaukolampo'}>Kaukolämpö</Form.Option>
                    <Form.Option value="maalampo" selected={property.primary_heating_system === 'maalampo'}>Maalämpö</Form.Option>
                    <Form.Option value="vilp" selected={property.primary_heating_system === 'vilp'}>Vesi-Ilma lämpöpumppu</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Toissijainen</Form.Label>
                <Form.Control type="select" name="secondary_heating_system">
                    <Form.Option value={null} selected={property.secondary_heating_system === null}>Ei Mitään</Form.Option>
                    <Form.Option value="takka" selected={property.secondary_heating_system === 'takka'}>Takka</Form.Option>
                    <Form.Option value="ilmalampopumppu" selected={property.secondary_heating_system === 'ilmalampopumppu'}>Ilmalämpöpumppu</Form.Option>
                </Form.Control>
            </Form.Group>
        </fieldset>
    )
}

export default HeatingFieldset;