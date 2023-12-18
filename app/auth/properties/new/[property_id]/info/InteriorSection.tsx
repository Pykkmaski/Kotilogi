import Form from "kotilogi-app/components/Form/Form";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";

export default function InteriorSection({currentData, onChangeHandler}){
    return (
        <>
            <Form.Group>
                <label>Pinta-ala m<sup>2</sup></label>
                <input name="livingArea" defaultValue={currentData.livingArea} onChange={onChangeHandler}/>
            </Form.Group>
            
            <Form.Group>
                <label>{currentData.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten Lukumäärä'}</label>
                <input name="floorCount" defaultValue={currentData.floorCount} onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <label>Huoneiden Lukumäärä</label>
                <input name="roomCount" defaultValue={currentData.roomCount} onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <label>Vessojen Lukumäärä</label>
                <input name="wcCount" defaultValue={currentData.wcCount} onChange={onChangeHandler}/>
            </Form.Group>
        </> 
    );
}