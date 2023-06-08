import { useEffect } from 'react';
import Form from '../../../../Components/Form';
import ToggleAbleFieldset from './ToggleAbleFieldset';

function BuildingFieldset(props){
    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Rakennus</Form.Legend>
            <Form.Group>
                <Form.Label>Asuntotyyppi</Form.Label>
                <Form.Control type="select">
                    <Form.Option value="none">Ei Valittu</Form.Option>
                    <Form.Option value="house">Omakotitalo</Form.Option>
                    <Form.Option value="appartment">Kerrostalo</Form.Option>
                    <Form.Option value="row_house">Rivitalo</Form.Option>
                    <Form.Option>Luhtitalo</Form.Option>
                    <Form.Option>Erillistalo</Form.Option>
                    <Form.Option>Paritalo</Form.Option>
                    <Form.Option>Puutalo-osake</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Rakennusmateriaali</Form.Label>
                <Form.Control name="build_material" type="select">
                    <Form.Option name="wood">Puu</Form.Option>
                    <Form.Option name="concrete">Betoni</Form.Option>
                    <Form.Option name="brick">Tiili</Form.Option>
                    <Form.Option name="log">Hirsi</Form.Option>
                    <Form.Option name="other">Muu</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Energialuokitus</Form.Label>
                <Form.Control type="select" name="energy_certificate">
                    <Form.Option value="none">Ei Ole</Form.Option>
                    <Form.Option value="A">A</Form.Option>
                    <Form.Option value="B">B</Form.Option>
                    <Form.Option value="C">C</Form.Option>
                    <Form.Option value="D">D</Form.Option>
                    <Form.Option value="E">E</Form.Option>
                    <Form.Option value="F">F</Form.Option>
                    <Form.Option value="G">G</Form.Option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Rakennusvuosi</Form.Label>
                <Form.Control type="number" min={1} step={1} name="build_year"/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Kerrosluku</Form.Label>
                <Form.Control type="number" min={1} step={1} name="floor_count"></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Huoneluku</Form.Label>
                <Form.Control type="number" min={1} step={1} name="room_count"></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Vessojen lukumäärä</Form.Label>
                <Form.Control type="number" min={1} step={1} name="wc_count"></Form.Control>
            </Form.Group>
        </fieldset>
    )
}

export default BuildingFieldset;