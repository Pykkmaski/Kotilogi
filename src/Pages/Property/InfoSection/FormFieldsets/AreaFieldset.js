import { useState, useRef, useContext, useEffect } from 'react';
import Form from '../../../../Components/Form';
import PropertyContext from '../../../../Contexts/PropertyContext';

function AreaFieldset(props){

    const {property} = useContext(PropertyContext);
    const [totalArea, setTotalArea] = useState(parseInt(property.living_area) + parseInt(property.other_area));

    const livingArea = useRef(parseInt(property.living_area));
    const otherArea = useRef(parseInt(property.other_area));

    useEffect(() => {
        console.log('updating total area');
        setTotalArea(livingArea.current + otherArea.current);
    }, [livingArea.current, otherArea.current]);    

    return (
        <fieldset disabled={props.disabled}>
            <Form.Legend>Asunnon pinta-alat (m<sup>2</sup>)</Form.Legend>
            <Form.Group>
                <Form.Label>Asuintilojen pinta-ala</Form.Label>
                <Form.Control id="living-area-input" type="number" step={0.01} name="living_area" defaultValue={property.living_area} onInput={(e) => livingArea.current = e.target.valueAsNumber}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Muut tilat</Form.Label>
                <Form.Control id="other-area-input" type="number" step={0.01} name="other_area" defaultValue={property.other_area} onInput={(e) => otherArea.current = e.target.valueAsNumber}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Yhteensä</Form.Label>
                <output name='total_area' htmlFor="living_area other_area">{totalArea}m<sup>2</sup></output>
            </Form.Group>
        </fieldset>
    )
}

export default AreaFieldset;