import { useEffect, useContext } from 'react';
import Form from '../../../../Components/Form';
import ToggleAbleFieldset from './ToggleAbleFieldset';
import PropertyContext from '../../../../Contexts/PropertyContext';

function BuildingFieldset(props){

    const {property} = useContext(PropertyContext);

    console.log(property.type);

    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Rakennus</Form.Legend>

            <Form.Group>
                <Form.Label>Osoite</Form.Label>
                <Form.Control type="text" name="address" defaultValue={property.address}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Postinumero</Form.Label>
                <Form.Control name="zip_code" defaultValue={property.zip_code}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Asuntotyyppi</Form.Label>
                <Form.Control name="type" type="select">
                    <Form.Option value="none" selected={property.type === 'none'}>Ei Valittu</Form.Option>
                    <Form.Option value="omakotitalo" selected={property.type === 'omakotitalo'}>Omakotitalo</Form.Option>
                    <Form.Option value="kerrostalo" selected={property.type === 'kerrostalo'}>Kerrostalo</Form.Option>
                    <Form.Option value="rivitalo" selected={property.type === 'rivitalo'}>Rivitalo</Form.Option>
                    <Form.Option value="luhtitalo" selected={property.type === 'luhtitalo'}>Luhtitalo</Form.Option>
                    <Form.Option value="erillistalo" selected={property.type === 'erillistalo'}>Erillistalo</Form.Option>
                    <Form.Option value="paritalo" selected={property.type === 'paritalo'}>Paritalo</Form.Option>
                    <Form.Option value="puutalo-osake" selected={property.type === 'puutalo-osake'}>Puutalo-osake</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Rakennusmateriaali</Form.Label>
                <Form.Control name="building_material" type="select">
                    <Form.Option value="puu" selected={property.building_material === 'puu'}>Puu</Form.Option>
                    <Form.Option value="betoni" selected={property.building_material === 'betoni'}>Betoni</Form.Option>
                    <Form.Option value="tiili" selected={property.building_material === 'tiili'}>Tiili</Form.Option>
                    <Form.Option value="hirsi" selected={property.building_material === 'hirsi'}>Hirsi</Form.Option>
                    <Form.Option value="muu" selected={property.building_material === 'muu'}>Muu</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Väri</Form.Label>
                <Form.Control name="color" type="select">
                    <Form.Option value="valkoinen" selected={property.color === 'valkoinen'}>Valkoinen</Form.Option>
                    <Form.Option value="sininen" selected={property.color === 'sininen'}>Sininen</Form.Option>
                    <Form.Option value="punainen" selected={property.color === 'punainen'}>Punainen</Form.Option>
                    <Form.Option value="keltainen" selected={property.color === 'keltainen'}>Keltainen</Form.Option>
                    <Form.Option value="musta" selected={property.color === 'musta'}>Musta</Form.Option>
                    <Form.Option value="ruskea" selected={property.color === 'ruskea'}>Ruskea</Form.Option>
                    <Form.Option value="muu" selected={property.color === 'muu'}>Muu</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Energialuokitus</Form.Label>
                <Form.Control type="select" name="energy_class">
                    <Form.Option value="none" selected={property.energy_class === 'none'}>Ei Ole</Form.Option>
                    <Form.Option value="A" selected={property.energy_class === 'A'}>A</Form.Option>
                    <Form.Option value="B" selected={property.energy_class === 'B'}>B</Form.Option>
                    <Form.Option value="C" selected={property.energy_class === 'C'}>C</Form.Option>
                    <Form.Option value="D" selected={property.energy_class === 'D'}>D</Form.Option>
                    <Form.Option value="E" selected={property.energy_class === 'E'}>E</Form.Option>
                    <Form.Option value="F" selected={property.energy_class === 'F'}>F</Form.Option>
                    <Form.Option value="G" selected={property.energy_class === 'G'}>G</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Rakennusvuosi</Form.Label>
                <Form.Control type="number" min={1} step={1} name="build_year" defaultValue={property.build_year}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Kerrosluku</Form.Label>
                <Form.Control type="number" min={1} step={1} name="floor_count" defaultValue={property.floor_count}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Huoneluku</Form.Label>
                <Form.Control type="number" min={1} step={1} name="room_count" defaultValue={property.room_count}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Vessojen lukumäärä</Form.Label>
                <Form.Control type="number" min={1} step={1} name="wc_count" defaultValue={property.wc_count}></Form.Control>
            </Form.Group>
        </fieldset>
    )
}

export default BuildingFieldset;