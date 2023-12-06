import Form from "kotilogi-app/components/Form";
import { buildingMaterials, buildingTypes, colors, energyClasses, primaryHeatingSystems, secondaryHeatingSystems } from "kotilogi-app/constants";

export default function HeatingSection({currentData, onChangeHandler}){
    return (
        <>
            <Form.Group>
                <label>Ensisijainen</label>
                <select onChange={onChangeHandler} name="primaryHeatingSystem">
                    {
                        primaryHeatingSystems.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.primaryHeatingSystem} key={`primaryHeatingSystem-option-${index}`}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Toissijainen</label>
                <select onChange={onChangeHandler} name="secondaryHeatingSystem">
                    {
                        secondaryHeatingSystems.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.secondaryHeatingSystem} key={`secondaryHeatingSystem-option-${index}`}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>
        </> 
    );
}