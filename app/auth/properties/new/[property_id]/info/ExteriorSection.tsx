import Form from "kotilogi-app/components/Form";
import { buildingTypes, colors, energyClasses, yardOwnershipTypes } from "kotilogi-app/constants";

export default function ExteriorSection({currentData, onChangeHandler}){
    return (
        <>
            <Form.Group>
                <label>Pinta-ala m<sup>2</sup></label>
                <input name="yardArea" defaultValue={currentData.yardArea} onChange={onChangeHandler}/>
            </Form.Group>
            
            <Form.Group>
                <label>Omistustyyppi</label>
                <select name="yardOwnership" onChange={onChangeHandler}>
                    {
                        yardOwnershipTypes.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.yardOwnership} key={`yardOwnership-option-${index}`}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>
        </> 
    );
}