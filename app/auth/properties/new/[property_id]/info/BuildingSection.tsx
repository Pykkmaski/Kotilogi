import Form from "kotilogi-app/components/Form";
import { buildingMaterials, buildingTypes, colors, energyClasses } from "kotilogi-app/constants";

export default function BuildingSection({currentData, onChangeHandler}){
    return (
        <>
            <Form.Group>
                <label>Rakennusmateriaali</label>
                <select onChange={onChangeHandler} name="buildingMaterial">
                    {
                        buildingMaterials.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.buildingMaterial} key={`option-${index}`}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Väri</label>
                <select onChange={onChangeHandler} name="color">
                    {
                        colors.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.color} key={`option-${index}`}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>
        </> 
    );
}