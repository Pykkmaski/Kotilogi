import Form from "kotilogi-app/components/Form/Form";
import { roofMaterials, roofTypes } from "kotilogi-app/constants";

export default function RoofSection({currentData, onChangeHandler}){
    return (
        <>
            <Form.Group>
                <label>Katon tyyppi</label>
                <select name="roofType" onChange={onChangeHandler}>
                    {
                        roofTypes.map((val, index: number) => {
                            return (
                                <option value={val} key={`roof-type-${index}`} selected={val === currentData.roofType}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Katon materiaali</label>
                <select name="roofMaterial" onChange={onChangeHandler}>
                    {
                        roofMaterials.map((val, index: number) => {
                            return (
                                <option value={val} key={`roof-mat-${index}`} selected={val === currentData.roofMaterial}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>
        </>  
    );
}